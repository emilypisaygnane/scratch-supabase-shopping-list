const SUPABASE_URL = 'https://zreruwbpazeflnpdvgpu.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyZXJ1d2JwYXplZmxucGR2Z3B1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTk2Mzg0NDAsImV4cCI6MTk3NTIxNDQ0MH0.0w4nYxAaZh9xi9hDm28uWJV9oLX7WW7apIb6-J9S88E';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export function checkAuth() {
    const user = getUser();
    // do we have a user?
    if (!user) { 
        // path is different if we are at home page versus any other page
        const authUrl = location.pathname === '/' ? './auth/' : '../auth/';
        // include the current url as a "redirectUrl" search param so user can come
        // back to this page after they sign in...
        location.replace(`${authUrl}?redirectUrl=${encodeURIComponent(location)}`);
    }

    // return the user so can be used in the page if needed
    return user;
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */

export async function addItem(item, quantity) {
    const response = await client
        .from('list')
        .insert({
            item: item,
            quantity: quantity,
            bought: false,
            user_id: client.auth.user().id
        })
        .single();

    return checkError(response);
}

export async function getItems() {
    const response = await client 
        .from('list')
        .select('*')
        .order('id');

    return checkError(response);
}

export async function boughtItem(id) {
    const response = await client
        .from('list')
        .update({ bought: true })
        .match ({ id: id });

    return checkError(response);
}

export async function deleteItems() {
    const response = await client
        .from('list')
        .delete()
        .match({ user_id: client.auth.user().id });

    return checkError(response);
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}