
import { getSearchResults } from "./actions";

export async function SearchResults({ query }: { query: string }) {
  if (!query) {
    return (
      <div className="text-center text-muted-foreground">
        <p>Enter a search query to begin.</p>
      </div>
    );
  }

  const searchData = await getSearchResults(query);

  return (
    <div className="max-w-4xl mx-auto">
      <p className="text-sm text-muted-foreground mb-4">
        Showing results for &quot;{query}&quot;
      </p>

      {searchData?.results && searchData.results.length > 0 ? (
        <div className="space-y-6">
          {searchData.results.map((result, index) => (
            <div key={index}>
              <a
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <p className="text-sm text-muted-foreground truncate">{result.url}</p>
                <h3 className="text-xl font-medium text-blue-500 group-hover:underline">
                  {result.title}
                </h3>
              </a>
              <p className="text-muted-foreground">{result.snippet}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground">
          <p>No results found for &quot;{query}&quot;.</p>
        </div>
      )}
    </div>
  );
}
