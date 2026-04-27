import type { Metadata } from "next";
import { SearchClient } from "@/components/search-client";
import { searchEntries } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Search",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;

  return (
    <SearchClient
      entries={searchEntries}
      initialQuery={params.q ?? ""}
    />
  );
}
