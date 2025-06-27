import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useUserRole } from '../hooks/useUserRole'
import { supabase } from '../lib/supabase'
import { PostForm } from '../components/PostForm'
import { UserManagement } from '../components/UserManagement'
import { RoleAssignment } from '../components/RoleAssignment'
import { format } from 'date-fns'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'

interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  featured_image?: string
  published: boolean
  status: 'draft' | 'pending' | 'published' | 'rejected'
  created_at: string
  updated_at: string
  author_id?: string
  published_by?: string
  published_at?: string
}

interface Category {
  id: string
  name: string
  slug: string
  description?: string
  created_at: string
}

export function CMS() {
  const { user } = useAuth()
  const { role, canWrite, isAdmin, loading: roleLoading } = useUserRole()
  const [activeTab, setActiveTab] = useState<'posts' | 'categories' | 'users' | 'roles'>('posts')
  const [posts, setPosts] = useState<Post[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showPostForm, setShowPostForm] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Show loading while checking role
  if (roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Show access denied if no write permissions
  if (!canWrite && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Required</h2>
          <p className="text-gray-600 mb-6">
            You need writer or admin permissions to access the CMS. 
          </p>
          <RoleAssignment />
        </div>
      </div>
    )
  }

  useEffect(() => {
    if (user && (canWrite || isAdmin)) {
      fetchPosts()
      fetchCategories()
    }
  }, [user, canWrite, isAdmin])

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name')

      if (error) throw error
      setCategories(data || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId)

      if (error) throw error
      setPosts(posts.filter(post => post.id !== postId))
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  const handleEditPost = (post: Post) => {
    setEditingPost(post)
    setShowPostForm(true)
  }

  const handlePostSaved = () => {
    setShowPostForm(false)
    setEditingPost(null)
    fetchPosts()
  }

  const getStatusBadge = (status: string) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800',
      published: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Management System</h1>
        <p className="text-gray-600">Manage your blog content, categories, and users</p>
        <div className="mt-2 text-sm text-blue-600">
          Logged in as: {user.email} ({role || 'No role assigned'})
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'posts', label: 'Posts' },
            { key: 'categories', label: 'Categories' },
            ...(isAdmin ? [
              { key: 'users', label: 'Users' },
              { key: 'roles', label: 'Roles' }
            ] : [])
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Posts Tab */}
      {activeTab === 'posts' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Posts</h2>
            <button
              onClick={() => setShowPostForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus size={18} />
              <span>Create New Post</span>
            </button>
          </div>

          {showPostForm && (
            <div className="mb-8 p-6 bg-white rounded-lg shadow-md border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  {editingPost ? 'Edit Post' : 'Create New Post'}
                </h3>
                <button
                  onClick={() => {
                    setShowPostForm(false)
                    setEditingPost(null)
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <PostForm
                post={editingPost}
                onSave={handlePostSaved}
                onCancel={() => {
                  setShowPostForm(false)
                  setEditingPost(null)
                }}
              />
            </div>
          )}

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{post.title}</div>
                          <div className="text-sm text-gray-500">{post.excerpt}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(post.status)}`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {format(new Date(post.created_at), 'MMM dd, yyyy')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEditPost(post)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Categories Tab */}
      {activeTab === 'categories' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Categories</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Create New Category
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {category.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {category.slug}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {category.description || 'No description'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-4">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Users Tab - Only for Admins */}
      {activeTab === 'users' && isAdmin && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">User Management</h2>
          <UserManagement />
        </div>
      )}

      {/* Roles Tab - Only for Admins */}
      {activeTab === 'roles' && isAdmin && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Role Assignment</h2>
          <RoleAssignment />
        </div>
      )}
    </div>
  )
}