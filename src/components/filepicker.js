const FilePicker = ({ title }) => {
  return (
    <div className="dropdown">
      <div className="dropdown-title">{title}</div>
      <input type="file" className="file-picker css-13vuage" />
    </div>
  );
};

export default FilePicker;
