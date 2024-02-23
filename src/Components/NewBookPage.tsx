import "./NewBookPage.css"

function NewBookPage() {

    function handleConfirm() {
        const name = (document.getElementById('name-input') as HTMLInputElement).value;
        const description = (document.getElementById('description-input') as HTMLInputElement).value;
        const author = (document.getElementById('author-input') as HTMLInputElement).value;
        const genre = (document.getElementById('genre-input') as HTMLInputElement).value;
        const pageCount = (document.getElementById('page-count-input') as HTMLInputElement).value;
        const price = (document.getElementById('price-input') as HTMLInputElement).value;

        if (
            name === "" ||
            description === "" ||
            author === "" ||
            genre === "" ||
            pageCount === "" ||
            price === ""
        ) {
            (document.getElementById('inform-p') as HTMLElement).textContent = "Fields cannot be empty";
        }
    }

    return (
        <div>
            <div className="nb-title-container">
                <h1>New book</h1>
            </div>
            <div className="nb-main-container">
                <div className="nb-left-panel">
                    <p className="nb-key">Name</p>
                    <input id="name-input" className="nb-input" placeholder="Name"/>
                    <br/>
                    <br/>
                    <p className="nb-key">Description</p>
                    <textarea id="description-input" className="nb-input height-300" placeholder="Description"/>
                    <br/>
                    <br/>
                    <p className="nb-key">Author full name</p>
                    <input id="author-input" className="nb-input" placeholder="Author full name"/>
                    <br/>
                    <br/>
                    <p className="nb-key">Genre</p>
                    <input id="genre-input" className="nb-input" placeholder="Genre"/>
                    <br/>
                    <br/>
                    <p className="nb-key">Page count</p>
                    <input id="page-count-input" className="nb-input" type="number" placeholder="Page count"/>
                    <br/>
                    <br/>
                    <p className="nb-key">Price</p>
                    <input id="price-input" className="nb-input" type="number" placeholder="Price"/>
                    <br/>
                    <br/>
                </div>
                <div className="nb-right-panel">
                    <div className="nb-button-and-text-container">
                        <p id="inform-p"></p>
                        <button onClick={handleConfirm} className="nb-confirm-button">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewBookPage;