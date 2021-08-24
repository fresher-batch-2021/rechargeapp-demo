const routes = [
    { path: 'index.html' },
    { path: 'plans.html' },
    { path: 'myrecharges.html', roles: ["USER"] },
    { path: 'allrecharges.html', roles: ["ADMIN"] }
];


function checkAccess(pageName, role) {
    let isAllowed = false;
    for (let route of routes) {
        if (route.path == pageName) {
            if (!route.roles) {
                isAllowed = true;
                break;
            } else if (route.roles.includes(role)) {
                isAllowed = true;
                break;
            }
        }
    }
    //Need to write logic
    return isAllowed;
}

let user = JSON.parse(localStorage.getItem("LOGGED_IN_USER"));
let role = user != null ? user.role : null;
let pathName = window.location.pathname.substr(1);
console.log("Path Name:", pathName, ",role=", role);
let allowedAccess = checkAccess(pathName, role);

console.log("Access :", allowedAccess);

if (!allowedAccess) {
    alert("You are not authorized to access this page. Redirecting to login page");
    window.location.href = "login.html";
}