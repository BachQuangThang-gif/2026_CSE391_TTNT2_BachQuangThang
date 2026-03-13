let students = [];
let filteredStudents = [];

let sortAsc = true;

function getRank(score){
if(score >= 8.5) return "Giỏi";
if(score >= 7) return "Khá";
if(score >= 5) return "Trung bình";
return "Yếu";
}

function addStudent(){

const nameInput = document.getElementById("name");
const scoreInput = document.getElementById("score");

let name = nameInput.value.trim();
let score = parseFloat(scoreInput.value);

if(name === ""){
alert("Họ tên không được để trống");
return;
}

if(isNaN(score) || score < 0 || score > 10){
alert("Điểm phải từ 0 đến 10");
return;
}

students.push({name,score});

nameInput.value="";
scoreInput.value="";
nameInput.focus();

applyFilters();
}

function applyFilters(){

let keyword = document.getElementById("search").value.toLowerCase();
let rankFilter = document.getElementById("filterRank").value;

filteredStudents = students.filter(sv=>{

let matchName = sv.name.toLowerCase().includes(keyword);

let rank = getRank(sv.score);
let matchRank = rankFilter === "all" || rank === rankFilter;

return matchName && matchRank;

});

filteredStudents.sort((a,b)=> sortAsc ? a.score - b.score : b.score - a.score);

renderTable();
}

function renderTable(){

const tbody = document.getElementById("tableBody");
const noResult = document.getElementById("noResult");

tbody.innerHTML="";

if(filteredStudents.length===0){

noResult.innerText="Không có kết quả";
}else{
noResult.innerText="";
}

let sum=0;

filteredStudents.forEach((sv,index)=>{

sum += sv.score;

let tr=document.createElement("tr");

if(sv.score<5){
tr.classList.add("low-score");
}

tr.innerHTML=`
<td>${index+1}</td>
<td>${sv.name}</td>
<td>${sv.score}</td>
<td>${getRank(sv.score)}</td>
<td><button data-name="${sv.name}" class="deleteBtn">Xóa</button></td>
`;

tbody.appendChild(tr);

});

document.getElementById("total").innerText="Tổng sinh viên: "+filteredStudents.length;

let avg = filteredStudents.length ? (sum/filteredStudents.length).toFixed(2) : 0;

document.getElementById("avg").innerText="Điểm TB: "+avg;

updateSortArrow();
}

function updateSortArrow(){

const th = document.getElementById("sortScore");

th.innerHTML = "Điểm " + (sortAsc ? "▲" : "▼");

}

document.getElementById("addBtn").addEventListener("click",addStudent);

document.getElementById("score").addEventListener("keypress",function(e){
if(e.key==="Enter") addStudent();
});

document.getElementById("search").addEventListener("input",applyFilters);

document.getElementById("filterRank").addEventListener("change",applyFilters);

document.getElementById("sortScore").addEventListener("click",function(){

sortAsc = !sortAsc;

applyFilters();

});

document.getElementById("tableBody").addEventListener("click",function(e){

if(e.target.classList.contains("deleteBtn")){

let name = e.target.dataset.name;

students = students.filter(sv => sv.name !== name);

applyFilters();

}

});

applyFilters();