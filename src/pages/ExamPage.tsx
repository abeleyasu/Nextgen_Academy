import React, { useEffect, useState } from "react";
import supabase from "../supabaseClient";

const ExamPage = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      const { data, error } = await supabase.from("exams").select("*");
      if (error) console.error(error);
      else setExams(data);
    };
    fetchExams();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Available Exams</h1>
      <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3">
        {exams.map((exam) => (
          <div key={exam.id} className="p-4 border rounded shadow-md bg-white">
            <h2 className="text-lg font-bold">{exam.title}</h2>
            <button className="px-4 py-2 mt-2 text-white bg-green-500 rounded hover:bg-green-600">
              Take Exam
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamPage;
