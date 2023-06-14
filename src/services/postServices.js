export const getPost = async() => {
    const response = await fetch("/api/posts",{
        method:"GET"
    });
    return response;
};