import { Droppable, Draggable } from 'react-beautiful-dnd';
import Item from './Item';

const Row = props => {
  return (
    <Draggable draggableId={props.row.id} index={props.index}>
      {provided => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="row"
        >
          <h2 {...provided.dragHandleProps}>{props.row.id}</h2>

          <Droppable
            droppableId={props.row.id}
            direction="horizontal"
            type="item"
          >
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={
                  snapshot.isDraggingOver
                    ? { backgroundColor: 'tomato' }
                    : { backgroundColor: 'blue' }
                }
                className="items"
              >
                {props.row.items.map((item, index) => (
                  <Item key={item} index={index} item={item} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Row;
