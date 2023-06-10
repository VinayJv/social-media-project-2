export const postLoginData = async(email,password) => {
    const response = await fetch("/api/auth/login",{
        method:"POST",
        body: JSON.stringify({
            email,password
        })
    });
};