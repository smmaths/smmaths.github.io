# Saint Martin Mathematics Website

This is the official website for Saint Martin Mathematics, showcasing our expertise in algorithm development and web application solutions.

## Features

- Responsive design that works on all devices
- Modern and clean user interface
- Blog section for sharing insights and updates
- Contact form for client inquiries
- Smooth scrolling navigation
- Bootstrap 5 framework for consistent styling

## File Structure

```
.
├── index.html          # Main website page
├── css/
│   └── styles.css      # Custom styles
├── js/
│   └── main.js         # JavaScript functionality
└── blog/
    └── template.html   # Blog post template
```

## Adding New Blog Posts

To add a new blog post:

1. Copy the `blog/template.html` file and rename it to your desired URL (e.g., `my-new-post.html`)
2. Update the following in the new file:
   - Title in the `<title>` tag
   - Blog post title in the `<h1>` tag
   - Date and author in the meta section
   - Featured image URL
   - Content in the blog-body section
3. Add the new blog post to the `blogPosts` array in `js/main.js`:
   ```javascript
   {
       title: "Your Blog Post Title",
       date: "YYYY-MM-DD",
       excerpt: "Brief description of your post",
       image: "URL to your featured image",
       link: "blog/your-post-filename.html"
   }
   ```

## Customization

### Colors and Styling
- Main colors and styles are defined in `css/styles.css`
- The website uses Bootstrap 5's default color scheme, which can be customized by overriding Bootstrap variables

### Images
- Replace placeholder images with your own
- Recommended image sizes:
  - Hero section: 1920x1080px
  - Blog post featured images: 1200x400px
  - Blog card images: 800x400px

## Contact Form

The contact form is currently set up to log form submissions to the console. To make it functional:

1. Set up a backend server to handle form submissions
2. Update the `handleContactForm` function in `js/main.js` to send data to your server
3. Implement proper form validation and error handling

## Browser Support

The website is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## Maintenance

Regular maintenance tasks:
1. Update Bootstrap and other dependencies as needed
2. Check and update blog post links
3. Monitor and update contact form functionality
4. Review and update content regularly
5. Test website responsiveness on different devices

## Development

To modify the website:
1. Make changes to the HTML, CSS, or JavaScript files
2. Test changes locally
3. Deploy updates to your web server

## License

© 2024 Saint Martin Mathematics. All rights reserved. 