export default function ProjectsGrid({ children }) {
    return(
        <div className="my-10 grid grid-cols-1 xl:grid-cols-2 gap-4 py-10">
            {children}
        </div>
    )

}