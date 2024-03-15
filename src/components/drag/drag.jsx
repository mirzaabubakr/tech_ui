import React, { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { v4 as uuidv4 } from "uuid";
import { BASE_URL } from "../../utils/config";

const ItemTypes = {
  CARD: "card",
};

// eslint-disable-next-line react/prop-types
const Card = ({ id, text, index, moveCard, link }) => {
  const ref = React.useRef(null);

  const handleHover = (item, monitor) => {
    if (!ref.current) {
      return;
    }
    const dragIndex = item.index;
    const hoverIndex = index;
    if (dragIndex === hoverIndex) {
      return;
    }
    const hoverBoundingRect = ref.current.getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }
    moveCard(dragIndex, hoverIndex);
    item.index = hoverIndex;
  };

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover: handleHover,
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;

  drag(drop(ref));

  return (
    <div ref={ref} className="card" style={{ opacity }}>
      <img src={link} className="card-image" />
      {text}
      <a href={link} className="card-link">
        Link to image
      </a>
    </div>
  );
};

const DragDropSorting = () => {
  const [files, setFiles] = useState([]);
  const data = localStorage.getItem("userData");
  const token = localStorage.getItem("token");

  const user = JSON.parse(data);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch(`${BASE_URL}/file/get/${user.data.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch files");
        }
        const filesData = await response.json();
        setFiles(filesData.data.result);
      } catch (error) {
        console.error(error);
        // Handle error (e.g., show error message to the user)
      }
    };
    fetchFiles();
  }, [token, user.data.id]);

  const moveCard = (dragIndex, hoverIndex) => {
    const dragCard = files[dragIndex];
    const updatedFiles = [...files];
    updatedFiles.splice(dragIndex, 1);
    updatedFiles.splice(hoverIndex, 0, dragCard);
    setFiles(updatedFiles);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="card-container">
        {files.map((file, index) => (
          <Card
            key={file.id}
            id={file.id}
            text={file.filename}
            index={index}
            link={file.link}
            moveCard={moveCard}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default DragDropSorting;
