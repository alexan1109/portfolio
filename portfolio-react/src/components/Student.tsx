function Student() {
type Student = {
    student: string;
    degree: string;
    points: number;
  }

const student = 'Alexander Myrvold'
const degree = 'Bachelor IT'
const points = 180

function Header({ student, degree, points }: Student) {
    return (
      <article>
      <h4>Student name: {student}</h4>
      <h4>Degree: {degree}</h4>
      <p>Points: {points}</p>
      </article>
    )
  }

return(
    <>
      <Header student={student} degree={degree} points={points} />
    </>
)
}

export default Student