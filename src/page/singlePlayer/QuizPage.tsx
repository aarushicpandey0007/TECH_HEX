import React from 'react';
// import QuizContainer from '../../container/SinglePlayer/QuizContainer';
import Question from '../../view/view1/Question';

const QuizPage: React.FC = () => {

    const dummyQuestion = "What is the idea of techHEX?";
    const dummyOptions = {
        a: "Option A",
        b: "Option B",
        c: "Option C",
        d: "Option D"
    };
    // const hexagons = Array.from({ length: 49 }); // Total of 49 hexagons for a 7x7 grid

    return (
        <>
            {/* <QuizContainer /> */}
            <Question question={dummyQuestion} options={dummyOptions} />
        </>
    );
};

export default QuizPage;