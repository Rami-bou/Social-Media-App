function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    showUI()
    showAlert('Nice, you logged out successfully')
}