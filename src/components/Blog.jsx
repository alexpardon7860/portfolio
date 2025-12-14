import React, { useState } from 'react';
import { Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { blogPosts } from '../data/mock';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

const Blog = () => {
  // const [selectedPost, setSelectedPost] = useState(null);
  // const [filter, setFilter] = useState('all');

  // const categories = ['all', 'Machine Learning', 'Web Development', 'Deep Learning'];

  // const filteredPosts = filter === 'all'
  //   ? blogPosts
  //   : blogPosts.filter(post => post.category === filter);

  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  // };

  return (
    <section id="blog" className="py-32 bg-slate-950 relative overflow-hidden">
      {/* BLOG SECTION TEMPORARILY COMMENTED OUT */}
    </section>
  );
};

export default Blog;