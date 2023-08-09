const itemListContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "30vh",
    color: "black",
    fontWeight: "bold",
};

const ItemListContainer = (props) => {
    return (
        <div style={itemListContainerStyle}>
            <h2>{props.greeting}</h2>
        </div>
    );
};

export default ItemListContainer;