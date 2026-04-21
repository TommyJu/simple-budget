const ScrollContainer = ({items}) => {
    return (
        <div className="flex flex-col items-center border rounded-lg h-full w-full p-4">
            <div className="flex w-full justify-between p-2">
                <p>Filters</p>
                <button className="btn btn-primary btn-sm md:btn-md">
                    + Create New Fixed Expense
                </button>
            </div>
            {/* Scrollable section */}
            <div className="h-full w-full overflow-y-scroll border rounded-lg m-2 p-4">
                <p>Some item</p>
            </div>
        </div>
        
    );
};

export default ScrollContainer