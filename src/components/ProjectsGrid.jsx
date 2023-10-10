export default function ProjectsGrid({ children }) {
    return(
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 py-16">
            {children}
        </div>
    )

}