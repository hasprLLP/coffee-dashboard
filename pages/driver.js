//& Input Components [#IMPORTS#]
import TextField from "@/components/input/input";
import SaveButton from "@/components/button/button";

//& Create & Export Driver [#FUNCTION#]
export default function Driver() {
  
  //$ States and Hooks [#STATES#]
  const fields = [
    { title: "Name", placeholder: "Enter Name" },
    { title: "Place", placeholder: "Enter Name" },
    { title: "Ok", placeholder: "Enter Name" },
    { title: "Name", placeholder: "Enter Name" },
    { title: "Name", placeholder: "Enter Name" },
    { title: "Name", placeholder: "Enter Name" },
    { title: "Name", placeholder: "Enter Name" },
    { title: "Name", placeholder: "Enter Name" },
    { title: "Name", placeholder: "Enter Name" },
  ];

  //& Return UI [#RETURN#]
  return (
    <div className="home">
      <div className="driver">
        <div className="driver-title">Create Driver</div>
        <div className="driver-form">
          {fields.map((item) => {
            return <TextField key={item.title} title={item.title} placeholder={item.placeholder} />;
          })}
        </div>
        <SaveButton />
      </div>
    </div>
  );
}
