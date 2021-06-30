let data = [];

const fetchData = () => {
    // html elements
    const adult = document.querySelector('#adult')
    const active = document.querySelector('#active')
    const firstName = document.querySelector('#firstName')

    if(!adult.checked && !active.checked && firstName.value == ""){
        return false
    }else {

        try {

            //verinin çekildiği yer
            fetch("data.json")
            .then(response => {
                return response.json();
            })
            .then(responseData => {
                //json'dan okunan verinin data array'ine atanması
                data = responseData;

                if(adult.checked){
                    let filteredData = data.filter(element => element.age >= 18);
                    data = filteredData
                }
                if (active.checked) {
                    let filteredData = data.filter(element => element.isActive === true);
                    data = filteredData
                }
                if (isNaN(firstName.value)) {
                    let filteredData = data.filter(element => firstName.value.charAt(0).toLowerCase() === element.name.charAt(0).toLowerCase() );
                    data = filteredData
                }
                listData(data);  
            })
            .catch(err => {
                //hata yönetimi
                console.log(err)
            })
            
        } catch (error) {
            alert('bir hata olustu : ' + error.message)
        }

        

        //verinin ul tag'i içerisinde listelenmesini sağlayan fonksiyon
        const listData = (data) => {
        let list = document.querySelector(".list");
        list.innerHTML = data.map(element => {
                return `
                <li id=${element.id}>
                    <span class='bold'>name:</span> ${element.name}
                    <span class='bold'>age:</span> ${element.age}
                    <span class='bold'>aktif:</span> ${element.isActive}
                </li>
                `;
            })
        }

        
    }
    












    
}



