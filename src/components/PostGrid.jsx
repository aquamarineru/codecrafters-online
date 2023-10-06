export default function PostGrid({ children }) {
    return(
        <div className="grid grid-cols-1 md:grid-cols-3">
            {children}
        </div>
    )

}