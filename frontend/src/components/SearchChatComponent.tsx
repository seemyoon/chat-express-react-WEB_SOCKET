import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { chatService } from "../services/chat.service";
import { IChat } from "../interfaces/chat.interface";

const SearchChatComponent = () => {
    const { register, handleSubmit } = useForm<{ query: string }>();
    const [searchResults, setSearchResults] = useState<IChat[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async ({ query }: { query: string }) => {
        try {
            setLoading(true);
            const results = await chatService.searchChat(query);
            setSearchResults(results);
        } catch (error) {
            console.error("Search failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h3>Search for Chats</h3>
            <form onSubmit={handleSubmit(handleSearch)}>
                <input
                    type="text"
                    placeholder="Input search request"
                    {...register("query")}
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Searching..." : "Search"}
                </button>
            </form>
            <div>
                {searchResults.length === 0 && <p>No results found</p>}
                <ul>
                    {searchResults.map((chat) => (
                        <li key={chat._id}>
                            {chat.firstName} {chat.lastName}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SearchChatComponent;
