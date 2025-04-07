

// import path from 'path';
// import fs from 'fs';
// import { spawn } from 'child_process';
// import FaceRecognition from '../models/face-model';

// const __dirname = path.resolve();

// const faceRecognition = async (req, res) => {
//     const { userId, email_id } = req.user;
//     const { latitude, longitude } = req.body;  // Get location from the request body
    
//     if (!latitude || !longitude) {
//         return res.status(400).json({ success: false, message: "Location data is required" });
//     }

//     try {
//         console.log('Received request for user:', userId);

//         const batchFilePath = path.join(__dirname, '..', '..', '1SIHFACE', 'runPythonScript.bat');
//         console.log('Batch file path:', batchFilePath);
        
//         const executePythonScript = () => {
//             return new Promise((resolve, reject) => {
//                 const pythonProcess = spawn('cmd.exe', ['/c', batchFilePath]);

//                 pythonProcess.stdout.on('data', (data) => {
//                     console.log(`Python stdout: ${data.toString()}`);
//                 });

//                 pythonProcess.stderr.on('data', (data) => {
//                     console.error(`Python stderr: ${data.toString()}`);
//                 });

//                 pythonProcess.on('close', (code) => {
//                     console.log(`Python process exited with code ${code}`);
//                     if (code === 0) {
//                         resolve();
//                     } else {
//                         reject(new Error(`Python script failed with exit code ${code}`));
//                     }
//                 });
//             });
//         };

//         await executePythonScript();

//         const loginStatusPath = path.join(__dirname, '..', '..', '1SIHFACE', 'face-attendance-system', 'login_status.txt');
//         console.log('Login status file path:', loginStatusPath);
        
//         const readLoginStatus = () => {
//             return new Promise((resolve, reject) => {
//                 fs.readFile(loginStatusPath, 'utf8', (err, data) => {
//                     if (err) {
//                         console.error('Error reading login status file:', err);
//                         return reject(err);
//                     }
//                     resolve(data);
//                 });
//             });
//         };

//         let loginStatus;
//         try {
//             loginStatus = await readLoginStatus();
//             console.log('Current login status:', loginStatus);
//         } catch (error) {
//             console.error('Error reading login status:', error);
//             return res.status(500).json({ success: false, message: "Error reading login status file" });
//         }

//         if (loginStatus === `Logged in as ${email_id}`) {
//             let userFaceRecord = await FaceRecognition.findOne({ userId });

//             if (!userFaceRecord) {
//                 userFaceRecord = new FaceRecognition({
//                     userId,
//                     email,
//                     attendance: [{ status: 'present', location: { latitude, longitude } }],
//                 });
//             } else {
//                 userFaceRecord.attendance.push({ status: 'present', location: { latitude, longitude } });
//             }
//             await userFaceRecord.save();

//             return res.status(200).json({
//                 success: true,
//                 message: 'Attendance marked successfully with location'
//             });

//         } else {
//             console.error("Login status mismatch:", loginStatus);
//             return res.status(400).json({ success: false, message: "Login status does not match" });
//         }
//     } catch (error) {
//         console.error('Error in faceRecognition:', error);
//         return res.status(500).json({ success: false, message: "Internal server error" });
//     }
// }

// export { faceRecognition };




import path from 'path';
import fs from 'fs';
import { spawn } from 'child_process';
import FaceRecognition from '../models/face-model.js';
import { responseFormatter } from '../utils/app.utils.js';
import { ApiStatusCodes } from '../enums/app.enums.js';

const __dirname = path.resolve();

export const faceRecognition = async (req, res) => {
    try {
        const { userId, email_id } = req.user;
        const { latitude, longitude } = req.body;  // Get location from the request body
        
        if (!latitude || !longitude) {
            return res.json(
                responseFormatter(
                    ApiStatusCodes.BAD_REQUEST,
                    false,
                    null,
                    "Location data is required"
                )
            );
        }

        console.log('Received request for user:', userId);

        const batchFilePath = path.join(__dirname, '..', '..', '1SIHFACE', 'runPythonScript.bat');
        console.log('Batch file path:', batchFilePath);
        
        const executePythonScript = () => {
            return new Promise((resolve, reject) => {
                const pythonProcess = spawn('cmd.exe', ['/c', batchFilePath]);

                pythonProcess.stdout.on('data', (data) => {
                    console.log(`Python stdout: ${data.toString()}`);
                });

                pythonProcess.stderr.on('data', (data) => {
                    console.error(`Python stderr: ${data.toString()}`);
                });

                pythonProcess.on('close', (code) => {
                    console.log(`Python process exited with code ${code}`);
                    if (code === 0) {
                        resolve();
                    } else {
                        reject(new Error(`Python script failed with exit code ${code}`));
                    }
                });
            });
        };

        await executePythonScript();

        const loginStatusPath = path.join(__dirname, '..', '..', '1SIHFACE', 'face-attendance-system', 'login_status.txt');
        console.log('Login status file path:', loginStatusPath);
        
        const readLoginStatus = () => {
            return new Promise((resolve, reject) => {
                fs.readFile(loginStatusPath, 'utf8', (err, data) => {
                    if (err) {
                        console.error('Error reading login status file:', err);
                        return reject(err);
                    }
                    resolve(data);
                });
            });
        };

        let loginStatus;
        try {
            loginStatus = await readLoginStatus();
            console.log('Current login status:', loginStatus);
        } catch (error) {
            console.error('Error reading login status:', error);
            return res.json(
                responseFormatter(
                    ApiStatusCodes.INTERNAL_SERVER_ERROR,
                    false,
                    null,
                    "Error reading login status file"
                )
            );
        }

        if (loginStatus === `Logged in as ${email_id}`) {
            let userFaceRecord = await FaceRecognition.findOne({ userId });

            if (!userFaceRecord) {
                userFaceRecord = new FaceRecognition({
                    userId,
                    email: email_id,
                    attendance: [{ status: 'present', location: { latitude, longitude } }],
                });
            } else {
                userFaceRecord.attendance.push({ status: 'present', location: { latitude, longitude } });
            }
            await userFaceRecord.save();

            return res.json(
                responseFormatter(
                    ApiStatusCodes.OK,
                    true,
                    null,
                    'Attendance marked successfully with location'
                )
            );

        } else {
            console.error("Login status mismatch:", loginStatus);
            return res.json(
                responseFormatter(
                    ApiStatusCodes.BAD_REQUEST,
                    false,
                    null,
                    "Login status does not match"
                )
            );
        }
    } catch (error) {
        console.error('Error in faceRecognition:', error);
        return res.json(
            responseFormatter(
                ApiStatusCodes.INTERNAL_SERVER_ERROR,
                false,
                null,
                "Internal server error"
            )
        );
    }
}
