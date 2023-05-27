export const WillDrop = () => {
  const styles = {
    draggable: {
      "text-align": "center",
      background: "white",
    },

    dropzone: {
      height: "20px",
      width: "200px",
      background: "blueviolet",
      margin: "10px",
      padding: "10px",
    },

    dropzoneDragover: {
      "background-color": "purple",
    },

    dragging: {
      opacity: 0.5,
    },
  };
  return (
    <>
      <div className="dropzone w-52 h-24 bg-blue-400 m-5 p-5">
        <div
          id="draggable"
          draggable="true"
          className="text-center bg-white text-black"
        >
          This div is draggable
        </div>
      </div>
      <div
        className="dropzone w-52 h-24 bg-blue-400 m-5 p-5"
        id="droptarget"
        // onDragEnter={}
        onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
          e.preventDefault();
        }}
      ></div>
    </>
  );
};
