function verifLogin(name, pwd) {
    if (name == "etudiant") {
        if (pwd == "etudiant") {
            window.location.href = "../pages/etu_page.html"
        } else {
            document.write("Wrong Password!")
        }
    } 
    else if (name == "prof") {
    	if (pwd == "prof") {
    		window.location.href = "../pages/prof_notifications.html"
    	} else {
    		document.write("Wrong Password!")
    	}
    }
    else if (name == "admin") {
    	if (pwd == "admin") {
    		window.location.href = "../pages/admin_page.html"
    	} else {
    		document.write("Wrong Password!")
    	}
    }
    else {
        document.write("Wrong Name!")
    }
    return false;
}