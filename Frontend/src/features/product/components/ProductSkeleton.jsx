import { useTheme } from "../hook/useTheme"

function ProductSkeleton() {
  const theme = useTheme()

  return (
    <div className="bg-white rounded-2xl overflow-hidden" style={{ border: `1px solid ${theme.borderLight}` }}>
      <div className="animate-pulse" style={{ aspectRatio: '4/3', background: theme.imgBg }} />
      <div className="p-2.5 sm:p-3.5 space-y-2 sm:space-y-2.5">
        <div className="h-3.5 sm:h-4 w-3/4 rounded-md animate-pulse" style={{ background: theme.skeletonDark }} />
        <div className="h-3 w-full rounded-md animate-pulse" style={{ background: theme.skeletonLight }} />
        <div className="h-3 w-1/3 rounded-md animate-pulse" style={{ background: theme.skeletonDark }} />
      </div>
    </div>
  )
}

export default ProductSkeleton