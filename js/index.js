let modal = document.getElementById("contactModal");
let uAvatar = document.getElementById("avatarPreview");
let uName = document.getElementById("contactName");
let uTel = document.getElementById("contactPhone");
let uEmail = document.getElementById("contactEmail");
let uAddress = document.getElementById("contactAddress");
let uGroup = document.getElementById("contactGroup");
let uNotes = document.getElementById("contactNotes");
let uFavourite = document.getElementById("contactFavorite");
let avatarUpload = document.getElementById("avatarInput");
let uEmergency = document.getElementById("contactEmergency");
let contactContainer = document.getElementById("contactCardContainer")
let avatarDefaultIcon = document.querySelector("#avatarPreview > .fa-user");
let favouritesContainer = document.getElementById("bigFavItem")
let emergenciesContainer = document.getElementById("bigEmergencyItem")
let modalTitle = document.getElementById("modalTitle")
let submitBtn = document.getElementById("submitModalBtn")
let editBtn = document.getElementById("editModalBtn")
let searchInput = document.getElementById("searchInput")
let contactNameError= document.getElementById("contactNameError")
let contactPhoneError = document.getElementById("contactPhoneError")
let contactEmailError = document.getElementById("contactEmailError")
let totalContacts = document.getElementById("totalContacts")
let totalFavContacts = document.getElementById("totalFavContacts")
let totalEmergencyContacts = document.getElementById("totalEmergencyContacts")
let totalContactsSpan = document.getElementById("totalContactsSpan")
let favouriteList = [];
let emergencyList = [];
let contactList = [];
let bgColors = {
    Family : "blue-bg",
    Friends : "green-bg",
    Work : "purple-bg",
    School : "yellow-bg",
    Other : "gray-bg"
};
let regExps = [/^[A-Z a-z]{2,50}$/ ,/01[0-25][0-9]{8}$/ , /\w+(@gmail\.com|@yahoo\.com)$/ ]
if(localStorage.getItem("contacts") != "[]" && localStorage.getItem("contacts") != null){
    contactList = JSON.parse(localStorage.getItem("contacts"))
    addContact(contactList)
}else{
    contactContainer.innerHTML = `<div class="col-12 text-center py-5">
                            <div class="d-flex align-items-center justify-content-center mx-auto mb-4 bg-secondary-subtle
                                     rounded-4" style="width: 80px; height: 80px;">
                                <i class="fas fa-address-book text-secondary fs-4"></i>
                            </div>
                            <p class="text-muted fw-semibold mb-1">No contacts found</p>
                            <p class="text-secondary small">
                                Click <strong>"Add Contact"</strong> to get started
                            </p>
                        </div>`
}
function clearInput(){
    uAvatar.style.backgroundImage = "linear-gradient(135deg, var(--accent-blue), var(--blue-600))"
    avatarDefaultIcon.classList.remove("d-none");
    uName.value = ""
    uTel.value = ""
    uEmail.value = ""
    uAddress.value = ""
    uNotes.value = ""
    uGroup.innerHTML = "\n <option value=\"\">Select a group</option>\n <option value=\"family\">Family</option>\n <option value=\"friends\">Friends</option>\n<option value=\"work\">Work</option>\n<option value=\"school\">School</option>\n<option value=\"other\">Other</option>\n"
    uFavourite.checked = false
    uEmergency.checked = false
    avatarUpload.value = ""
    modalTitle.innerHTML = "Add New Contact"
    editBtn.classList.add("d-none")
    submitBtn.removeAttribute("data-bs-dismiss" )
    editBtn.removeAttribute("data-bs-dismiss")
    contactNameError.classList.add("d-none")
    contactPhoneError.classList.add("d-none")
    contactEmailError.classList.add("d-none")

};
function swal(){
    if(uName.value == ""){
        Swal.fire({
        title: "Missing Name",
        text: "Please enter a name for the contact!",
        icon: "error"
        });
        return false
    }
    if(!(regExps[0].test(uName.value))){
        Swal.fire({
        title: "Invalid Name",
        text: "Name should contain only letters and spaces (2-50 characters)",
        icon: "error"
        });
        return false
    }
    if(uTel.value == ""){
        Swal.fire({
        title: "Missing Phone",
        text: "Please enter a phone number!",
        icon: "error"
        });
        return false
    }
    if(!(regExps[1].test(uTel.value))){
        Swal.fire({
        title: "Invalid Phone",
        text: "Please enter a valid Egyptian phone number (e.g., 01012345678 or +201012345678)",
        icon: "error"
        });
        return false
    }
    for(let i=0;i<contactList.length;i++){
        if(uTel.value == contactList[i].tel){
            Swal.fire({
                title: "Duplicate Phone Number",
                text: `A contact with this phone number already exists: ${contactList[i].name}`,
                icon: "error"
            });
            return false
        }
    }
    if(!(regExps[2].test(uEmail.value)) && uEmail.value != "" ){
        Swal.fire({
        title: "Invalid Email",
        text: "Please enter a valid email address",
        icon: "error"
        });
        return false
    }
    return true
}
function addImage(){
    avatarDefaultIcon.classList.add("d-none");
    uAvatar.style.backgroundImage = `url(./img/${avatarUpload.files[0].name}`;
}
function createContact(){
    let bool =swal()
    if(!(bool)){return}
    let contact = {
            name : uName.value,
            address : uAddress.value,
            email : uEmail.value,
            tel : uTel.value,
            avatar : avatarUpload.files.length ? avatarUpload.files[0].name : "phone-book.png",
            group : uGroup.selectedOptions[0].innerHTML,
            favourite : uFavourite.checked,
            emergency : uEmergency.checked,
            notes : uNotes.value
        }
        contactList.push(contact)
        addContact(contactList)
}
function addContact(List){
        contactContainer.innerHTML = ""
        let box = ""
        for(let i =0;i<contactList.length;i++){
            let contact = List[i]
            box +=`<div  class="col-md-6 col-lg-12 col-xl-6 mb-4">
                            <div class="contact-card">
                                <div class="contact-card-header">
                                    <div class="d-flex align-items-start justify-content-start gap-3">
                                        <div class="position-relative flex-shrink-0  ">
                                            <img src="img/${contact.avatar}" alt="${contact.name}"
                                                class="contact-card-avatar object-fit-cover">
                                            <div
                                                class="badge-icon badge-heart d-flex justify-content-center align-items-center rounded-circle ${contact.emergency ? "" : "d-none"}">
                                                <i class="fas fa-heart-pulse"></i>
                                            </div>
                                            <div
                                                class="badge-icon badge-star d-flex justify-content-center align-items-center rounded-circle ${contact.favourite ? "" : "d-none"}">
                                                <i class="fas fa-star"></i>
                                            </div>
                                        </div>
                                        <div class="flex-1 min-w-0 pt-1">
                                            <h3 class="contact-card-name truncate m-0 ">${contact.name}</h3>
                                            <div class="d-flex align-items-center gap-2 mt-1">
                                                <div class="contact-card-phone-container flex-shrink-0">
                                                    <i class="contact-card-phone-icon fas fa-phone"></i>
                                                </div>
                                                <span class="contact-card-phone truncate">${contact.tel}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="contact-details">
                                        <div class="contact-detail-item ${contact.email ? "" : "d-none"}">
                                            <div
                                                class="contact-detail-icon-container d-flex align-items-center justify-content-center violet">
                                                <i class="contact-detail-icon violet fas fa-envelope"></i>
                                            </div>
                                            <span class="contact-detail-text truncate">${contact.email}</span>
                                        </div>

                                        <div class="contact-detail-item ${contact.address ? "" : "d-none"}">
                                            <div
                                                class="contact-detail-icon-container d-flex align-items-center justify-content-center emerald">
                                                <i class="contact-detail-icon emerald fas fa-location-dot"></i>
                                            </div>
                                            <span class="contact-detail-text truncate">${contact.address}</span>
                                        </div>
                                    </div>
                                    <div class="contact-tags ${contact.group != "Select a group"? "" : "d-none" }">
                                        <span class="contact-tag d-inline-flex align-items-center ${bgColors[contact.group]}">${contact.group}</span>
                                    </div>
                                </div>
                                <div class="contact-card-actions">
                                    <div class="action-buttons-left">
                                        <a href="tel:${contact.tel}" id="callBtn" class="action-button call" title="Call">
                                            <i class="fas fa-phone"></i>
                                        </a>

                                        <a class="action-button email" id="emailBtn" title="Email">
                                            <i class="fas fa-envelope"></i>
                                        </a>
                                    </div>
                                    <div class="action-buttons-right">
                                        <button class="action-button favorite" id="favBtn" title="Favorite" onclick="favourite(${i})">
                                            <i class="fa-star ${contact.favourite ? "amber-400-bg amber-400-text fa-solid" : "far"}"></i>
                                        </button>
                                        <button class="action-button emergency"id="emergncyBtn" title="Emergency" onclick="emergency(${i})">
                                            <i class="${contact.emergency ? "rose-500-bg rose-500-text fa-solid fa-heart-pulse" : "far fa-heart"}"></i>
                                        </button>
                                        <button class="action-button edit" id="editBtn" title="Edit" data-bs-toggle="modal" data-bs-target="#contactModal" onclick="openContact(${i})">
                                            <i class="fas fa-pen"></i>
                                        </button>
                                        <button class="action-button delete"id="deleteBtn" title="Delete" onclick="deleteContact(${i})">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                    </div>`;
                    if(contact.favourite && favouriteList.indexOf(i) == -1){favouriteList.push(i);}
                    if(contact.emergency && emergencyList.indexOf(i) == -1){emergencyList.push(i);}
        }
        contactContainer.innerHTML = box;
    localStorage.setItem("contacts" , JSON.stringify(contactList) )
    clearInput();
    containers("favourite")
    containers("emergency")
    totalFavContacts.innerHTML = favouriteList.length
    totalContacts.innerHTML  = contactList.length
    totalContactsSpan.innerHTML = contactList.length
    totalEmergencyContacts.innerHTML = emergencyList.length
    
}   
function containers(keyword){
    switch(keyword){
        case "favourite":
                let x = ""
                for(let i =0;i<favouriteList.length;i++){
                let item = favouriteList[i]
                    x += ` <div id="smallFavItem"
                                        class="contact-item d-flex justify-content-between align-items-center gap-3 p-2 rounded-3 mb-3">
                                        <div class="flex-shrink-0">
                                            <img src="./img/${contactList[item].avatar}" alt="${contactList[item].name}" class="contact-avatar" />
                                        </div>
                                        <div class="flex-grow-1 text-truncate">
                                            <h4 class="mb-0 fw-medium text-dark small text-truncate">${contactList[item].name}</h4>
                                            <p class="mb-0 text-muted small text-truncate">${contactList[item].tel}</p>
                                        </div>
                                        <a href="tel:${contactList[item].tel}"
                                            class="call-btn d-flex align-items-center justify-content-center flex-shrink-0">
                                            <i class="fas fa-phone"></i>
                                        </a>
                            </div>`
                    }
                favouritesContainer.innerHTML = x
                if(favouriteList.length == 0){
                 favouritesContainer.innerHTML = `                                    <div id="emptyStateFav" class="empty-state">
                                        <p class="text-muted mb-0">No favorites yet</p>
                                    </div>`
                } 
            return
            case "emergency":
                let y = ""
                for(let i =0;i<emergencyList.length;i++){
                let item = emergencyList[i]
                    y += ` <div id="smallEmergncyItem"
                                        class="contact-item-emergency  d-flex align-items-center gap-3 p-2 rounded-3">
                                        <div class="flex-shrink-0">
                                            <img src="./img/${contactList[item].avatar}" alt="${contactList[item].name}" class="contact-avatar" />
                                        </div>
                                        <div class="flex-grow-1 text-truncate">
                                            <h4 class="mb-0 fw-medium text-dark small text-truncate">${contactList[item].name}</h4>
                                            <p class="mb-0 text-muted small text-truncate">${contactList[item].tel}</p>
                                        </div>
                                        <a href="tel:${contactList[item].tel}"
                                            class="call-btn-emergency call-btn-rose d-flex align-items-center justify-content-center flex-shrink-0">
                                            <i class="fas fa-phone"></i>
                                        </a>
                                    </div>`
            }
            emergenciesContainer.innerHTML = y
            if(emergencyList.length == 0){
        emergenciesContainer.innerHTML = `                                    <div class="col-12">
                                    <div id="emptyStateEmergency" class="empty-state">
                                        <p class="text-muted mb-0">No emergency contacts</p>
                                    </div>
                                </div>`
    }
            return
        }
}
function favourite(i){
    if(i != undefined){
        if(contactList[i].favourite){
            contactList[i].favourite = false;
            favouriteList.splice(favouriteList.indexOf(i) , 1)
        }else{
            contactList[i].favourite = true;
            favouriteList.push(i)
        }
    }
    containers("favourite")
    addContact(contactList);
};
function emergency(i){
    if(i != undefined){
        if(contactList[i].emergency){
            contactList[i].emergency = false;
            emergencyList.splice(emergencyList.indexOf(i) , 1)
        }else{
            contactList[i].emergency = true;
            emergencyList.push(i)
        }
    }
    containers("emergency")
    addContact(contactList);  
}
function deleteContact(i){
    favouriteList = []
    emergencyList = []
    contactList.splice(i , 1)
    addContact(contactList)
    if(contactList.length ==0){
        contactContainer.innerHTML = `<div class="col-12 text-center py-5">
                            <div class="d-flex align-items-center justify-content-center mx-auto mb-4 bg-secondary-subtle
                                     rounded-4" style="width: 80px; height: 80px;">
                                <i class="fas fa-address-book text-secondary fs-4"></i>
                            </div>
                            <p class="text-muted fw-semibold mb-1">No contacts found</p>
                            <p class="text-secondary small">
                                Click <strong>"Add Contact"</strong> to get started
                            </p>
                        </div>`
    }
}
function openContact(i){
    modalTitle.innerHTML = "Edit Contact";
    if(contactList[i].avatar == "phone-book.png"){
        uAvatar.style.backgroundImage =  "linear-gradient(135deg, var(--accent-blue), var(--blue-600))"
        avatarDefaultIcon.classList.remove("d-none");
    }else{
       uAvatar.style.backgroundImage = `url(./img/${contactList[i].avatar}`;
       avatarDefaultIcon.classList.add("d-none");
    }
    uName.value = contactList[i].name
    uTel.value = contactList[i].tel
    uEmail.value = contactList[i].email
    uAddress.value = contactList[i].address
    uNotes.value = contactList[i].notes
    uGroup[0] = uGroup[1]
    let groupIndex = uGroup.innerText.split("\n").indexOf(contactList[i].group)
    if(groupIndex != -1){
        let temp = uGroup[groupIndex].innerHTML
        uGroup[groupIndex].innerHTML = uGroup[0].innerHTML
        uGroup[0].innerHTML = temp
    }
    uFavourite.checked = contactList[i].favourite
    uEmergency.checked = contactList[i].emergency
    submitBtn.classList.add("d-none")
    editBtn.classList.remove("d-none")
    editBtn.setAttribute("custom-index" , i)
}
function editContact(){
    let bool =swal()
    if(!(bool)){return}
    let i= editBtn.getAttribute("custom-index");
    let contact = contactList[i]
    contact.name = uName.value;
    contact.address = uAddress.value;
    contact.email = uEmail.value;
    contact.tel = uTel.value;
    contact.avatar = avatarUpload.files.length ? avatarUpload.files[0].name : contact.avatar;
    contact.group = uGroup.selectedOptions[0].innerHTML;
    contact.favourite = uFavourite.checked;
    contact.emergency = uEmergency.checked;
    contact.notes = uNotes.value;
    favouriteList = []
    emergencyList = []
    addContact(contactList)
    clearInput()
    console.log(favouriteList)
}
function searchContacts(){
    let matches = []
    let search = searchInput.value
    for(let i=0;i<contactList.length;i++){
        if(contactList[i].name.toLowerCase().includes(search.toLowerCase()) || contactList[i].tel.toLowerCase().includes(search.toLowerCase()) || contactList[i].email.toLowerCase().includes(search.toLowerCase()) ){
            matches.push(contactList[i])
        }
    }
    addContact(matches)
}
function validate(e){
    if(e.id == "contactName" && e.value != "" && !(regExps[0].test(e.value))){
        contactNameError.classList.remove("d-none")
    }else{
        contactNameError.classList.add("d-none")
    }
    if(e.id == "contactPhone" && e.value != "" && !(regExps[1].test(e.value))){
        contactPhoneError.classList.remove("d-none")
    }else{
        contactPhoneError.classList.add("d-none")
    }
    if(e.id == "contactEmail" && e.value != "" && !(regExps[2].test(e.value))){
        contactEmailError.classList.remove("d-none")
    }else{
        contactEmailError.classList.add("d-none")
    }
    if(regExps[0].test(uName.value) && regExps[1].test(uTel.value) && (regExps[2].test(uEmail.value) || uEmail.value == "")){
        submitBtn.setAttribute("data-bs-dismiss" , "modal")
        editBtn.setAttribute("data-bs-dismiss" , "modal")
    }else{
        submitBtn.removeAttribute("data-bs-dismiss")
        editBtn.removeAttribute("data-bs-dismiss")
    }
    for(let i=0;i<contactList.length;i++){
        if(uTel.value == contactList[i].tel){
            submitBtn.removeAttribute("data-bs-dismiss")
            editBtn.removeAttribute("data-bs-dismiss")
        }
    }
}
