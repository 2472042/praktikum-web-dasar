window.onload = function () {

    function generateId() 
    {
        let lastId = parseInt(localStorage.getItem("lastId")) || 0;
        const newId = lastId + 1;
        localStorage.setItem("lastId", newId.toString());
        return newId;
    }

    function resetForm() {
        document.getElementById("namaInput").value = "";
        document.getElementById("hargaInput").value = "";
        document.getElementById("stokInput").value = "";
        document.getElementById("descriptionInput").value = "";

        document.getElementById("updateButton").dataset.editingId = "";
        document.getElementById("addButton").style.display = "inline";
        document.getElementById("updateButton").style.display = "none";
    }

    function saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products));
    }

    function getProducts() {
        return JSON.parse(localStorage.getItem("products")) || [];
    }


    function renderTable() {
        const products = getProducts();
        const tableBody = document.getElementById("data-table");
        tableBody.innerHTML = "";

        if (products.length === 0) {
            const row = document.createElement("tr");
            row.id = "no-data-row";
            row.innerHTML = "<td colspan='6'>Tidak ada produk</td>";
            tableBody.appendChild(row);
        } else {
            products.forEach(product => {
                const row = document.createElement("tr");
                row.dataset.id = product.id;
                row.innerHTML = `
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td>${product.description}</td>
                    <td>${product.stock}</td>
                    <td>
                        <button class="editButton">Edit</button>
                        <button class="deleteButton">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        }
    }

    function addProduct(product) {
        const products = getProducts();
        products.push(product);
        saveProducts(products);
        renderTable();
    }

    function updateProduct(updatedProduct) {
        let products = getProducts();
        products = products.map(product =>
            product.id === updatedProduct.id ? updatedProduct : product
        );
        saveProducts(products);
        renderTable();
    }

    function deleteProduct(id) 
    {
        if (!confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
            return;
        }

        let products = getProducts();
        products = products.filter(product => product.id !== id);
        saveProducts(products);

        if (products.length === 0) {
            localStorage.setItem("lastId", "0");
        }

        renderTable();
    }


    function editProduct(id) {
        const products = getProducts();
        const product = products.find(p => p.id === id);

        if (product) {
            document.getElementById("namaInput").value = product.name;
            document.getElementById("hargaInput").value = product.price.replace(/\./g, "");
            document.getElementById("stokInput").value = product.stock;
            document.getElementById("descriptionInput").value = product.description;

            document.getElementById("updateButton").dataset.editingId = id;
            document.getElementById("addButton").style.display = "none";
            document.getElementById("updateButton").style.display = "inline";
        }
    }

    document.getElementById("addButton").addEventListener("click", function () {
        const name = document.getElementById("namaInput").value;
        const price = new Intl.NumberFormat('en-DE').format(document.getElementById("hargaInput").value);
        const stock = document.getElementById("stokInput").value;
        const description = document.getElementById("descriptionInput").value;

        const newProduct = {
            id: generateId(),
            name: name,
            price: price,
            stock: stock,
            description: description
        };

        addProduct(newProduct);
        resetForm();
    });

    document.getElementById("updateButton").addEventListener("click", function () {
        const id = parseInt(this.dataset.editingId);

        const name = document.getElementById("namaInput").value;
        const price = new Intl.NumberFormat('en-DE').format(document.getElementById("hargaInput").value);
        const stock = document.getElementById("stokInput").value;
        const description = document.getElementById("descriptionInput").value;

        const updatedProduct = {
            id: id,
            name: name,
            price: price,
            stock: stock,
            description: description
        };


        updateProduct(updatedProduct);
        resetForm();
    });

    document.getElementById("data-table").addEventListener("click", function (event) {
        const target = event.target;

        if (target.classList.contains("editButton")) {
            const id = parseInt(target.closest("tr").dataset.id);
            editProduct(id);
        }

        if (target.classList.contains("deleteButton")) {
            const id = parseInt(target.closest("tr").dataset.id);
            deleteProduct(id);
        }
    });

    renderTable();
    resetForm();
};
