package com.example;

import dev.langchain4j.data.segment.TextSegment;
import dev.langchain4j.store.embedding.EmbeddingMatch;

import java.util.List;

public class Main {
    public static void main(String[] args) {
        ChromaInserter.addDocuments("I like football.");
        ChromaInserter.addDocuments("The weather is good today.");

        List<EmbeddingMatch<TextSegment>> search = ChromaSearcher.search("What is your favorite sport?", 1);
        // Prints:
        // Score: 0,926483
        // Result: I like football.
        System.out.printf("Score: %f\nResult: %s\n", search.getFirst().score(), search.getFirst().embedded().text());
    }
}