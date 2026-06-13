const Header = (props) => <h1>{props.course}</h1>;

const Content = (props) => (
  <ul>
    {props.parts.map(part => <li key={part.id}><Part part={part} /></li>)}
  </ul>
);

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);

const Total = (props) => {

    const totalExercises = props.parts.reduce((sum, part)=> {
        return sum + part.exercises
    }, 0)

    return (
        <strong><p>total of {totalExercises} exercises</p></strong>
    )
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />

      {/* <Total
        total={
          course.parts[0].exercises +
          course.parts[1].exercises +
          course.parts[2].exercises
        }
      /> */}
    </>
  );
};

export default Course;
