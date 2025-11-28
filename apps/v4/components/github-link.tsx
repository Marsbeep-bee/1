import * as React from "react"
import Link from "next/link"

import { siteConfig } from "@/lib/config"
import { Icons } from "@/components/icons"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Skeleton } from "@/registry/new-york-v4/ui/skeleton"

export function GitHubLink() {
  return (
    <Button asChild size="sm" variant="ghost" className="h-8 shadow-none">
      <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
        <Icons.gitHub />
        <React.Suspense fallback={<Skeleton className="h-4 w-8" />}>
          <StarsCount />
        </React.Suspense>
      </Link>
    </Button>
  )
}

export async function StarsCount() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5秒超时
    
    const data = await fetch("https://api.github.com/repos/shadcn-ui/ui", {
      next: { revalidate: 86400 },
      signal: controller.signal,
    })
    clearTimeout(timeoutId);
    const json = await data.json()

    const formattedCount =
      json.stargazers_count >= 1000
        ? json.stargazers_count % 1000 === 0
          ? `${Math.floor(json.stargazers_count / 1000)}k`
          : `${(json.stargazers_count / 1000).toFixed(1)}k`
        : json.stargazers_count.toLocaleString()

    return (
      <span className="text-muted-foreground w-fit text-xs tabular-nums">
        {formattedCount.replace(".0k", "k")}
      </span>
    )
  } catch (error) {
    console.error("Failed to fetch stars count:", error)
    // 返回一个默认值或空状态
    return <span className="text-muted-foreground w-fit text-xs">--</span>
  }
}