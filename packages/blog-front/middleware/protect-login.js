export default function ({ store, redirect, route }) {
  // If the user is not authenticated
  if (route.path === '/login') {
    if (store.state.userId) {
      return redirect('/')
    }
  }
}
