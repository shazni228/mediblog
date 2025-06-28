import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Database } from '../lib/database.types'
import { usePosts } from '../hooks/usePosts'
import { Save, X } from 'lucide-react'

type PostFormData = {
  title: string
  content: string
  slug?: string
  excerpt?: string
  featured_image?: string | null
  published?: boolean
  status?: 'draft' | 'pending' | 'published' | 'rejected'
  category?: string
  author?: string
}


const medicalCategories = [
  'Cardiology',
  'Pediatrics',
  'Nutrition',
  'Neurology',
  'Orthopedics',
  'Dermatology',
  'Psychiatry',
  'Oncology',
  'Endocrinology',
  'Gastroenterology',
  'Pulmonology',
  'Nephrology',
  'Infectious Disease',
  'Emergency Medicine',
  'General Medicine',
  'Surgery',
  'Radiology',
  'Pathology',
  'Anesthesiology',
  'Obstetrics & Gynecology'
]

export function AddPost() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { createPost, loading, error: postError } = usePosts()
  const [formError, setFormError] = useState<string | null>(null)
  
  // Clear any previous errors when the component mounts
  useEffect(() => {
    setFormError(null)
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PostFormData>()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  const onSubmit = async (formData: PostFormData) => {
    try {
      setFormError(null)
      console.log('Form submission started')
      
      if (!user) {
        const error = new Error('You must be logged in to create a post')
        console.error('User not authenticated:', error)
        throw error
      }

      // Basic validation
      if (!formData.title?.trim()) {
        const error = new Error('Title is required')
        console.error('Validation error:', error)
        throw error
      }
      
      if (!formData.content?.trim()) {
        const error = new Error('Content is required')
        console.error('Validation error:', error)
        throw error
      }

      // Generate a unique slug by appending a timestamp
      const baseSlug = formData.title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+|-+$/g, '')
      
      // Add timestamp to make slug unique
      const timestamp = Date.now().toString(36).slice(-6) // Last 6 chars of timestamp in base36
      const slug = formData.slug ? 
        `${formData.slug}-${timestamp}` : 
        `${baseSlug}-${timestamp}`

      const postData: Database['public']['Tables']['posts']['Insert'] = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        slug: slug,
        excerpt: (formData.excerpt || formData.content.substring(0, 200) + '...').trim(),
        status: 'draft',
        published: false,
        author_id: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        featured_image: formData.featured_image?.trim() || null,
        published_by: null,
        published_at: null
      }

      console.log('Creating post with data:', JSON.stringify(postData, null, 2))
      
      const { success, data, error } = await createPost(postData)
      console.log('Post creation result:', { success, data, error })
      
      if (success && data) {
        console.log('Post created successfully, resetting form and navigating...')
        reset()
        navigate('/')
      } else if (error) {
        console.warn('Error creating post:', error)
        setFormError('Failed to create post. Please try again.')
      } else {
        console.warn('Unexpected response from createPost:', { success, data, error })
        setFormError('An unexpected error occurred. Please try again.')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? 
        `Failed to create post: ${err.message}` : 
        'An unknown error occurred while creating the post'
      
      console.error('Error in onSubmit:', {
        error: err,
        message: errorMessage,
        stack: err instanceof Error ? err.stack : undefined
      })
      
      setFormError(errorMessage)
    }
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg border border-blue-100">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900">Add New Medical Article</h1>
            <p className="text-gray-600 mt-2">Share your medical knowledge with the community</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {(formError || postError) && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {formError || postError}
              </div>
            )}

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Article Title *
              </label>
              <input
                type="text"
                id="title"
                {...register('title', { required: 'Title is required' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter the article title..."
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Medical Category
                </label>
                <select
                  id="category"
                  {...register('category')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value="">Select a category...</option>
                  {medicalCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                  Author Name
                </label>
                <input
                  type="text"
                  id="author"
                  {...register('author')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Dr. John Smith"
                />
              </div>
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Article Content *
              </label>
              <textarea
                id="content"
                rows={15}
                {...register('content', { required: 'Content is required' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors font-mono text-sm"
                placeholder="Write your medical article content here... You can use Markdown formatting."
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
              )}
              <p className="mt-2 text-sm text-gray-500">
                Tip: You can use Markdown formatting for better content structure (headings, lists, bold text, etc.)
              </p>
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <X size={18} />
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Save size={18} />
                <span>{loading ? 'Publishing...' : 'Save as Draft'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}