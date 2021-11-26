const FilePicker = ({ title, setter }) => {

  const onFilePick = (e) => {
    const file = e.target.files[0];
    setter(file);
  };

  return (
    <div className="dropdown" style={{ marginRight: "0.5vw" }}>
      <div className="dropdown-title">{title}</div>
      <input
        type="file"
        className="file-picker css-13vuage"
        onChange={onFilePick}
        style={{ marginBottom: "2vw", marginTop: "1vw" }}
      />
    </div>
  );
};

export default FilePicker;
