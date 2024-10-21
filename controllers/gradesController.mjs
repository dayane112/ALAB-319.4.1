import db from '../db/conn.mjs';
import { ObjectId } from 'mongodb';

// Get single grade entry by id
async function getSingleGrade(req, res) {
  try {

    let query = { _id: new ObjectId(req.params.id) };

    let collection = await db.collection('grades');

    let result = await collection.findOne(query);

    res.json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
}

// Get grades by student id
async function getStudentGrades(req, res) {
  try {

    let query = { student_id: Number(req.params.id) };

    let collection = await db.collection('grades');

    let results = await collection.find(query).toArray();

    res.json(results);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
}

// Get grades by classID
async function getClassGrades(req, res) {
  try {

    let query = { class_id: Number(req.params.id) };

    let collection = await db.collection('grades');

    let results = await collection.find(query).toArray();

    res.json(results);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
}

// Create new grades in DB
async function createGrade(req, res) {
  try {

    let collection = await db.collection('grades');

    let result = await collection.insertOne(req.body);

    res.json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
}

export default { getSingleGrade, getClassGrades, getStudentGrades, createGrade };


// async function deleteGrades(req, res){
//     try {

//         let collection = await db.collection('grades');

//         let result = await collection.deletOne(req.body);

//         res.json(result);

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ msg: 'Server Error' });
//     };
// };

// // all class average for one learner
// async function studentClassesAvg(req, res){
//     try {
//         let collection = await db.collection('grades');

//         let result = await collection.aggregate([
//             {
//               $match: { student_id: Number(req.params.id) },
//             },
//             {
//               $unwind: { path: "$scores" },
//             },
//             {
//               $group: {
//                 _id: "$class_id",
//                 quiz: {
//                   $push: {
//                     $cond: {
//                       if: { $eq: ["$scores.type", "quiz"] },
//                       then: "$scores.score",
//                       else: "$$REMOVE",
//                     },
//                   },
//                 },
//                 exam: {
//                   $push: {
//                     $cond: {
//                       if: { $eq: ["$scores.type", "exam"] },
//                       then: "$scores.score",
//                       else: "$$REMOVE",
//                     },
//                   },
//                 },
//                 homework: {
//                   $push: {
//                     $cond: {
//                       if: { $eq: ["$scores.type", "homework"] },
//                       then: "$scores.score",
//                       else: "$$REMOVE",
//                     },
//                   },
//                 },
//               },
//             },
//             {
//               $project: {
//                 _id: 0,
//                 class_id: "$_id",
//                 avg: {
//                   $sum: [
//                     { $multiply: [{ $avg: "$exam" }, 0.5] },
//                     { $multiply: [{ $avg: "$quiz" }, 0.3] },
//                     { $multiply: [{ $avg: "$homework" }, 0.2] },
//                   ],
//                 },
//               },
//             },
//           ]).toArray()

//         res.json(result);

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ msg: 'Server Error' });
//     }
// }