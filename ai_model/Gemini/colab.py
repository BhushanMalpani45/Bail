import google.generativeai as genai
import time

# Configure Google Generative AI
genai.configure(api_key="AIzaSyC8QVswiobSY_zFhch2Gn346tsWa4LWPeg") # Replace with your actual API key
model = genai.GenerativeModel("gemini-pro")

 # Change this to your collection name

def get_query(query):
    print(query)
    prompt = "You are now an AI bot integrated into a law website. You have to answer the following question as an Indian Lawyer. So you are my lawyer.{}".format(query)

    # Implement retry logic with a delay
    max_retries = 3
    retries = 0
    while retries < max_retries:
        try:
            response = model.generate_content(prompt)
            print(response.text)
            return response.text
        except genai.TooManyRequestsError:
            retries += 1
            wait_time = 5 * retries  # Increase wait time with each retry
            print(f"Rate limit exceeded. Retrying in {wait_time} seconds...")
            time.sleep(wait_time)

    print("Failed to get a response after multiple retries.")
    return None  # or handle the error as needed


# Test the chatbot function
query = input("Enter your legal question: ")
response = get_query(query)
print("AI Lawyer Response: ", response)