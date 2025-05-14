/**
 * Admin Projects Page
 * Simple interface for managing project content
 */
import Link from "next/link"
import { getAllProjects } from "@/lib/projects"
import { Button } from "@/components/ui/button"
import { Edit, Plus, Trash } from "lucide-react"

export const metadata = {
  title: "Manage Projects | Admin",
  description: "Manage your portfolio projects",
}

export default async function AdminProjectsPage() {
  const projects = await getAllProjects()

  return (
    <main className="flex-1 ml-[240px] py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-black">Manage Projects</h1>
          <Button className="bg-[#4cd137] text-white hover:bg-[#4cd137]/90 border-2 border-black font-bold">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>

        <div className="bg-white border-4 border-black rounded-lg overflow-hidden shadow-lg">
          <div className="p-4 border-b-4 border-black bg-[#ffdd59]">
            <h2 className="text-xl font-bold">All Projects</h2>
          </div>
          <div className="p-0">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-left">Title</th>
                  <th className="p-4 text-left">Category</th>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-left">Featured</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="p-4">
                      <Link href={`/projects/${project.slug}`} className="font-medium hover:underline">
                        {project.title}
                      </Link>
                    </td>
                    <td className="p-4">{project.category}</td>
                    <td className="p-4">{project.date}</td>
                    <td className="p-4">{project.featured ? "Yes" : "No"}</td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="border-2 border-black">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="border-2 border-black text-red-500">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 bg-white border-4 border-black rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4">How to Manage Projects</h2>
          <div className="prose max-w-none">
            <p>
              Projects are stored as Markdown files in the <code>content/projects</code> directory. Each project has its
              own file with a <code>.md</code> extension.
            </p>
            <h3>File Format</h3>
            <p>
              Each project file starts with frontmatter (metadata) enclosed in <code>---</code> at the top of the file,
              followed by the content in Markdown format.
            </p>
            <h3>Required Fields</h3>
            <ul>
              <li>
                <code>title</code>: The project title
              </li>
              <li>
                <code>subtitle</code>: A short subtitle or tagline
              </li>
              <li>
                <code>description</code>: A brief description (1-2 sentences)
              </li>
              <li>
                <code>category</code>: The project category (e.g., character, environment)
              </li>
              <li>
                <code>thumbnail</code>: Path to the thumbnail image
              </li>
            </ul>
            <h3>Optional Fields</h3>
            <ul>
              <li>
                <code>tags</code>: Array of tags
              </li>
              <li>
                <code>images</code>: Array of image paths
              </li>
              <li>
                <code>modelUrl</code>: Path to 3D model file
              </li>
              <li>
                <code>featured</code>: Boolean (true/false)
              </li>
              <li>
                <code>client</code>: Client name
              </li>
              <li>
                <code>date</code>: Project date
              </li>
              <li>
                <code>software</code>: Array of software used
              </li>
              <li>
                <code>polygons</code>: Polygon count
              </li>
              <li>
                <code>formats</code>: Array of available formats
              </li>
              <li>
                <code>relatedProjects</code>: Array of related project objects
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
