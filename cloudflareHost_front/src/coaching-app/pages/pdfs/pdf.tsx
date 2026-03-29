
import EQQuiz from "../eqquiz/EQQuiz"
import FreeExerciseList from "./Freeexerciselist"
import PaidPdfList from "./Paidpdflist"




const Pdf = () => {
  return (
 <main className=" flex  flex-col">
    <EQQuiz/>
    <FreeExerciseList/>
    <PaidPdfList/>
   
    
 </main>
  )
}

export default Pdf