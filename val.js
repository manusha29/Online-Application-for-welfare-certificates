const form1=document.getElementById("form")
const Uname1=document.getElementById("Uname")
const Fname1=document.getElementById("Fname")
const vill1=document.getElementById("vill")
const man1=document.getElementById("man")
const dis1=document.getElementById("dis")
const caste1=document.getElementById("caste")
const dob1=document.getElementById("dob")
const in1=document.getElementById("IN")
const ph1=document.getElementById("phonemunber")
const tc1=document.getElementById("tc")

form1.addEventListener("submit",(e)=>{
    e.preventDefault()
    Validate()
}) 
function Validate(){
    let namevalue=Uname1.value.trim()
    let fnamevalue=Fname1.value.trim()
    let villvalue=vill1.value.trim()
    let manvalue=man1.value.trim()
    let disvalue=dis1.value.trim()
    let castevalue=caste1.value.trim()
    let dobvalue=dob1.value.trim()
    let incomevalue=in1.value.trim()
    let phonevalue=ph1.value.trim()
    let tcvalue=tc.value
    if(namevalue==""){
        setError(Uname,"user name cannot be empty")
    }
    else if(namevalue.length<4){
        setError(Uname,"user name should not be less than four characters")
    }
    else{
        setSuccesss(Uname)
    }
    if(fnamevalue==""){
        setError(Fname,"Fathername cannot be empty")
    }
    else if(fnamevalue.length<4){
        setError(Fname,"Fathername should not be less than four characters")
    }
    else{
        setSuccesss(Fname)
    }
    if(villvalue==""){
        setError(vill,"village name coannot be empty")
    }
    else if(villvalue.length<4){
        setError(vill,"village name should not be less than four characters")
    }
    else{
        setSuccesss(vill)
    }
    if(manvalue==""){
        setError(man,"mandel cannot be empty")
    }
    else if(manvalue.length<4){
        setError(man,"mandel should not be less than four characters")
    }
    else{
        setSuccesss(man)
    }
    if(disvalue==""){
        setError(dis,"district cannot be empty")
    }
    else if(disvalue.length<4){
        setError(dis,"district should not be less than four characters")
    }
    else{
        setSuccesss(dis)
    }
    if(castevalue==""){
        setError(caste,"caste cannot be empty")
    }
    else if(castevalue.length<4){
        setError(caste,"caste should not be less than four characters")
    }
    else{
        setSuccesss(caste)
    }
    if(dobvalue==""){
        setError(dob,"date of birth cannot be empty")
    }
    else{
        setSuccesss(dob)
    }
    if(incomevalue<0){
        setError(IN,"Income should not be empty")
    }
    else{
        setSuccesss(IN)
    }
    const phoneRegex = /^(?:\+91[-\s]?)?[789]\d{9}$/; // Indian phone number regex
    if (!phoneRegex.test(phonevalue)) {
        setError(phonenumber, "Phone number should contain 10 digits and start with 7, 8, or 9.");
    } else {
        setSuccesss(phonenumber);
    }
    if(tcvalue.checked){
        setError(tc,"click on agree terms checkbox")
    }
    else{
        setSuccesss(tc)
    }
}
    function setError(input,message){
        let parent=input.parentElement;
        let small=parent.querySelector("small")
        small.innerText=message
        parent.classList.add("error")
        parent.classList.remove("success")
    }
    function setSuccesss(input){
        let parent=input.parentElement;
        parent.classList.add("success")
        parent.classList.remove("error")
    }
