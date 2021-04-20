import { Draggable } from 'react-beautiful-dnd';

const Item = props => {
  return (
    <Draggable draggableId={props.item} index={props.index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`item ${snapshot.isDragging ? 'item_white' : 'item_grey'}`}
        >
          {props.item}
        </div>
      )}
    </Draggable>
  );
};

export default Item;
