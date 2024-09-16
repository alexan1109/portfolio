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
      <h2>{student}</h2>
      <h4>{degree}</h4>
      <p>{points}</p>
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