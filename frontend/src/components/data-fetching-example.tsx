"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

import { useApi } from "@/lib/use-api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Example type for API response
type Post = {
  id: number
  title: string
  body: string
}

export function DataFetchingExample() {
  const api = useApi()
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPosts = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Using our public API methods (no auth required)
      const data = await api.public.get<Post[]>("/posts")
      setPosts(data)
    } catch (err) {
      console.error("Error fetching posts:", err)
      setError("Failed to fetch posts. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Example of how to use the authenticated API methods
  const createPost = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const newPost = {
        title: "New Post",
        body: "This is a new post created with our API client",
      }

      // Using our authenticated API methods
      const createdPost = await api.auth.post<Post>("/posts", newPost)
      setPosts([createdPost, ...posts])
    } catch (err) {
      console.error("Error creating post:", err)
      setError("Failed to create post. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Fetch posts on component mount
    fetchPosts()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Fetching Example</CardTitle>
        <CardDescription>Example of using the custom API hook with authentication</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-between">
          <Button onClick={fetchPosts} variant="outline" disabled={isLoading}>
            Refresh Posts
          </Button>
          <Button onClick={createPost} disabled={isLoading || !api.isAuthenticated}>
            Create Post
          </Button>
        </div>

        {error && <div className="mb-4 rounded-md bg-destructive/15 p-3 text-sm text-destructive">{error}</div>}

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="space-y-4">
            {posts.length === 0 ? (
              <p className="text-center text-muted-foreground">No posts found</p>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="rounded-lg border p-4">
                  <h3 className="text-lg font-medium">{post.title}</h3>
                  <p className="mt-2 text-muted-foreground">{post.body}</p>
                </div>
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
