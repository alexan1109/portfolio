import { describe, expect, it } from "vitest";
import { buildQuery } from "./filter";

describe("filter", () => {
  it("returns base query when no query params are provided", () => {
    const query = buildQuery(["id", "title", "description"], undefined); // Pass `undefined` for queryParams
    expect(query.query).toBe("SELECT * FROM HABITS"); // Match the default base query
    expect(query.filters).toBeUndefined();
  });

  it("returns base query with selected fields (using limit)", () => {
    const query = buildQuery(["id", "title"], { limit: "id,title" });
    expect(query.query).toBe("SELECT id, title FROM HABITS");
    expect(query.filters).toEqual({});
  });

  it("ignores invalid filters", () => {
    const query = buildQuery(["id", "title"], { invalid_filter: "value" });
    expect(query.query).toBe("SELECT * FROM HABITS");
    expect(query.filters).toMatchObject({});
  });

  it("handles invalid filter values", () => {
    const query = buildQuery(["id", "title"], { limit: "invalid" });
    expect(query.query).toBe("SELECT * FROM HABITS");
    expect(query.filters).toMatchObject({});
  });

  it("cleans values to prevent SQL injections", () => {
    const query = buildQuery(["id", "title", "categories"], {
      categories: "fitness;DROP TABLE habits",
    });
    expect(query.query).toMatch(
      /SELECT \* FROM HABITS WHERE categories LIKE '%fitnessDROPTABLEhabits%'/
    );
    expect(query.filters).toEqual({ categories: "fitness;DROP TABLE habits" });
  });

  it("handles pagination", () => {
    const query = buildQuery(["id", "title"], { page_size: "10", page: "2" });
    expect(query.query).toMatch(/SELECT .* FROM HABITS LIMIT 10 OFFSET 10/);
  });

  it("handles sorting", () => {
    const query = buildQuery(["id", "title"], { sort: "title,DESC" });
    expect(query.query).toBe("SELECT * FROM HABITS ORDER BY title DESC");
  });

  it("handles invalid sorting", () => {
    const query = buildQuery(["id", "title"], { sort: "invalid_field,ASC" });
    expect(query.query).toBe("SELECT * FROM HABITS");
  });

  it("handles default direction", () => {
    const query = buildQuery(["id", "title"], { sort: "title" });
    expect(query.query).toBe("SELECT * FROM HABITS ORDER BY title ASC");
  });

  it("handles invalid sorting direction", () => {
    const query = buildQuery(["id", "title"], { sort: "title,invalid" });
    expect(query.query).toBe("SELECT * FROM HABITS ORDER BY title ASC");
  });
});
