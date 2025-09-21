# Favicon Update Instructions

## How to Replace the Favicon with Your Custom Blue Quill Icon

Follow these steps to replace the current favicon with your specific blue quill icon image:

### Option 1: Using PNG Format (Recommended)

1. **Save your blue quill icon image** as a PNG file with these specifications:
   - Size: 32x32 pixels (for best compatibility)
   - Format: PNG with transparent background
   - File name: `favicon.png`

2. **Replace the existing favicon:**
   ```bash
   # Navigate to your project directory
   cd /home/oluwaseyiae/Documents/quillinsight
   
   # Replace the existing favicon file
   cp /path/to/your/blue-quill-icon.png public/images/favicon.png
   ```

3. **The app is already configured** to use this file as the favicon through the layout.tsx metadata.

### Option 2: Using ICO Format (Traditional)

1. **Convert your image to ICO format** using an online converter or image editor
2. **Save as `favicon.ico`** in the public directory:
   ```bash
   cp /path/to/your/favicon.ico public/favicon.ico
   ```

### Option 3: Using SVG Format (Modern)

1. **If your icon is SVG format**, replace the app icon:
   ```bash
   cp /path/to/your/blue-quill-icon.svg app/icon.svg
   ```

### Verification Steps

After updating the favicon:

1. **Clear browser cache:**
   - Press Ctrl+Shift+R (or Cmd+Shift+R on Mac) to hard refresh
   - Or open DevTools → Application → Storage → Clear Storage

2. **Test in different browsers:**
   - Chrome, Firefox, Safari, Edge
   - Check both desktop and mobile versions

3. **Verify in browser tab:**
   - The blue quill icon should appear in the browser tab
   - Check bookmarks to ensure the icon displays correctly

### Current Configuration

The app is currently configured in `app/layout.tsx` to support multiple favicon formats:

```typescript
icons: {
  icon: [
    { url: "/icon.svg", type: "image/svg+xml" },
    { url: "/images/favicon.png", type: "image/png", sizes: "32x32" },
  ],
  apple: "/images/favicon.png",
  shortcut: "/images/favicon.png",
}
```

### Troubleshooting

**If the favicon doesn't update:**
1. Clear browser cache completely
2. Check file permissions (should be readable)
3. Verify file path is correct
4. Try opening the favicon URL directly: `http://localhost:3000/images/favicon.png`

**File size recommendations:**
- Keep under 10KB for fast loading
- Use PNG with transparency for best quality
- Consider creating multiple sizes (16x16, 32x32, 48x48) for different contexts

### Need Help?

If you encounter issues:
1. Check the browser console for errors
2. Verify the image file is not corrupted
3. Test with a simple square colored PNG first
4. Make sure the development server is restarted after file changes