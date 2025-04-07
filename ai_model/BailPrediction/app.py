from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import json
import google.generativeai as genai
import time

app = Flask(__name__)
CORS(app)

# Load the JSON data
with open('Laws.json') as laws_file:
    laws_data = json.load(laws_file)

with open('Offences.json') as offenses_file:
    offenses_data = json.load(offenses_file)

genai.configure(api_key="AIzaSyC8QVswiobSY_zFhch2Gn346tsWa4LWPeg") # Replace with your actual API key
model = genai.GenerativeModel("gemini-pro")

@app.route('/query', methods=['POST'])
def get_query():
    data=request.json
    query=data.get('query')
    prompt = "You are now an AI bot integrated into a law website. You have to answer the following question as an Indian Lawyer. So you are my lawyer.{}".format(query)

    # Implement retry logic with a delay
    max_retries = 3
    retries = 0
    while retries < max_retries:
        try:
            response = model.generate_content(prompt)
            res = make_response(jsonify({"data": response.text}))
            res.headers['Content-Type'] = 'application/json'
            return res
        except genai.TooManyRequestsError:
            retries += 1
            wait_time = 5 * retries  # Increase wait time with each retry
            print(f"Rate limit exceeded. Retrying in {wait_time} seconds...")
            time.sleep(wait_time)

    print("Failed to get a response after multiple retries.")
    res = make_response(jsonify({"data": "could not find anything for your case"}))
    res.headers['Content-Type'] = 'application/json'
    return res  # or handle the error as needed




@app.route('/get_info', methods=['POST'])
def get_info():
    print("yayay")
    data = request.json
    offenses_list = data.get('offenses')
    
    if not offenses_list:
        return jsonify({"error": "No offenses provided"}), 400
    
    offenses_names = []
    temp_list = offenses_list.split(',')
    for part in temp_list:
        offenses_names.extend(part.replace(' and ', ' ').split())

    offenses_names = [name.strip() for name in offenses_names if name.strip()]
    
    results = []
    
    for offense_name in offenses_names:
        offense = next((item for item in offenses_data if item['Offense_Name'].lower() == offense_name.lower()), None)
        if not offense:
            results.append({"error": f"Offense '{offense_name}' not found"})
            continue
        related_laws = [law for law in laws_data if law['Law_ID'] == offense['Law_ID']]
        
        result = {
            "Offense": offense_name,
            "Laws": [
                {
                    "Law_Name": law['Law_Name'],
                    "Abbreviation": law['Abbreviation'],
                    "Description": law['Description']
                }
                for law in related_laws
            ],
            "Penalty/Imprisonment Duration": offense.get('Penalty/Imprisonment Duration'),
            "Bail_Eligibility_Status": offense.get('Bail Eligibility Status')
        }
        
        results.append(result)
    
    response = make_response(jsonify({"data": results}))
    response.headers['Content-Type'] = 'application/json'
    return response

if __name__ == '__main__':
    app.run(debug=True)
