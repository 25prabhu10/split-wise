export const seo = ({
  description,
  image,
  keywords,
  title
}: {
  description?: string
  image?: string
  keywords?: string
  title: string
}) => {
  const tags = [
    { title },
    { content: description, name: description },
    { content: keywords, name: keywords },
    { content: title, name: title },
    { content: description, name: description },
    { content: '@25prabhu10', name: 'twitter:creator' },
    { content: '@25prabhu10', name: 'twitter:site' },
    { content: 'website', name: 'og:type' },
    { content: title, name: title },
    { content: description, name: description },
    ...(image
      ? [
          { content: image, name: image },
          { content: 'summary_large_image', name: 'twitter:card' },
          { content: image, name: image }
        ]
      : [])
  ]

  return tags
}
