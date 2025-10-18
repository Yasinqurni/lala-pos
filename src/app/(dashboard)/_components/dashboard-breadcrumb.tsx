'use client'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export default function DashboardBreadcrumb() {
    const pathname = usePathname()
    const paths = pathname.split('/').slice(1)

    return (
      <Breadcrumb>
        <BreadcrumbList>
          {paths.map((v, i) => (
            <Fragment key={`path-${v}`}>
              <BreadcrumbItem className="capitalize">
                {i < (paths.length - 1) ? (
                  <BreadcrumbLink
                    href={`/${paths.slice(0, i + 1).join('/')}`}
                  >
                    {v}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>
                    {v}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {i < (paths.length - 1) && <BreadcrumbSeparator />}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    )
}