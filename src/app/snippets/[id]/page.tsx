"use client";

import { useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import SnippetLoadingSkeleton from "./_components/SnippetLoadingSkeleton";
import NavigationHeader from "@/components/NavigationHeader";
import { Clock, Code, MessageSquare, Rocket, Trash2, User,Clipboard } from "lucide-react";
import { Editor } from "@monaco-editor/react";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "@/app/(root)/_constants";
import CopyButton from "./_components/CopyButton";
import Comments from "./_components/Comments";
import { useState, useEffect } from "react";
import Modal from "@/components/Modal";
import { useMutation } from "convex/react";


function SnippetDetailPage() {
  const snippetId = useParams().id;
  


  const snippet = useQuery(api.snippets.getSnippetById, { snippetId: snippetId as Id<"snippets"> });
  const comments = useQuery(api.snippets.getComments, { snippetId: snippetId as Id<"snippets"> });
  const hostedUrlfromdb = useQuery(api.snippets.getPreview, snippetId ? { snippetId: snippetId as Id<"snippets"> } : "skip");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isHosting, setIsHosting] = useState(false);
  //const [isHosted, setIsHosted] = useState(false); // Track if hosted
  const [hostedUrl, setHostedUrl] = useState(""); // Store hosted URL
  const { user } = useUser();
  const createPreview = useMutation(api.snippets.createPreview); 

  
  
  useEffect(() => {
    if (hostedUrlfromdb) {
      setHostedUrl(hostedUrlfromdb);
    }
  }, [hostedUrlfromdb]);

  if (snippet === undefined) return <SnippetLoadingSkeleton />;
  const imagePath = snippet.code ? `/${snippet.language}.png` : `/web.png`;

  

  const handleHosting = async () => {
    
    



    const userId = snippet.userId;

    console.log("Debugging userId and snippetId:", userId, snippetId);

    if (!userId || !snippetId) {
      console.error("Missing userId or snippetId");
      return;
    }

    // Corrected API request (NO body in GET request)
    const response = await fetch(`/api/preview/${userId}?snippetId=${snippetId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // Open preview after fetching
      const previewUrl = `https://codeorbital.vercel.app/api/preview/${userId}?snippetId=${snippetId}`;
      console.log("Opening preview:", previewUrl);
      window.open(previewUrl, "_blank");
      setHostedUrl(previewUrl);

      await createPreview({
        userId: user?.id || "",
        snippetId: snippetId as Id<"snippets">,
        url: previewUrl,
        pretitle: snippet.title,
      });

       
      setIsHosting(false);
    } else {
      console.error("Failed to fetch preview");
    }

    
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hostedUrl);
    alert("URL copied to clipboard!"); // You can replace this with a toast notification
  };




  // Social Media Share Function
  const handleSocialShare = (platform: string) => {
    const shareURL = `${window.location.origin}/snippets/${snippetId}`;
    const previewContent = snippet.html;

    let url = "";
    switch (platform) {
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareURL)}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=Check%20out%20this%20snippet!&url=${encodeURIComponent(shareURL)}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareURL)}`;
        break;
      case "instagram":
        // Instagram doesn't support direct link posting; you might generate a downloadable image
        alert("Instagram sharing requires uploading the preview manually.");
        return;
      default:
        break;
    }

    if (url) window.open(url, "_blank");
  };

  return (

    
    <div className="min-h-screen bg-[#0a0a0f]">
      <NavigationHeader />

      <main className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="bg-[#121218] border border-[#ffffff0a] rounded-2xl p-6 sm:p-8 mb-6 backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center size-12 rounded-xl bg-[#ffffff08] p-2.5">
                  <img
                    src={imagePath}
                    alt={`${snippet.language} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                    {snippet.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                    <div className="flex items-center gap-2 text-[#8b8b8d]">
                      <User className="w-4 h-4" />
                      <span>{snippet.userName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#8b8b8d]">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(snippet._creationTime).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#8b8b8d]">
                      <MessageSquare className="w-4 h-4" />
                      <span>{comments?.length} comments</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center px-3 py-1.5 bg-[#ffffff08] text-[#808086] rounded-lg text-sm font-medium">
                {snippet.language}
              </div>
            </div>
          </div>

          {/* Code Editor Section */}
          <div className="mb-8 rounded-2xl overflow-hidden border border-[#ffffff0a] bg-[#121218]">
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[#ffffff0a]">
              <div className="flex items-center gap-2 text-[#808086]">
                <Code className="w-4 h-4" />
                <span className="text-sm font-medium">Source Code</span>
              </div>
              <CopyButton code={snippet.code || `${snippet.html}\n${snippet.css}\n${snippet.js}`} />
            </div>
            {snippet.code ? (
              <Editor
                height="600px"
                language={LANGUAGE_CONFIG[snippet.language].monacoLanguage}
                value={snippet.code}
                theme="vs-dark"
                beforeMount={defineMonacoThemes}
                options={{
                  minimap: { enabled: false },
                  fontSize: 16,
                  readOnly: true,
                  automaticLayout: true,
                  scrollBeyondLastLine: false,
                  padding: { top: 16 },
                  renderWhitespace: "selection",
                  fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
                  fontLigatures: true,
                }}
              />
            ) : (
              <>
                {/* HTML Editor */}
                <div>
                  <h3 className="text-lg px-6 font-medium text-gray-400 uppercase mt-1">HTML</h3>
                  <Editor
                    height="200px"
                    language="html"
                    value={snippet.html}
                    theme="vs-dark"
                    options={{
                      minimap: { enabled: false },
                      fontSize: 16,
                      readOnly: true,
                      automaticLayout: true,
                      scrollBeyondLastLine: false,
                    }}
                  />
                </div>

                {/* CSS Editor */}
                <div>
                  <h3 className="text-lg px-6 font-medium text-gray-400 uppercase mt-1">CSS</h3>
                  <Editor
                    height="200px"
                    language="css"
                    value={snippet.css}
                    theme="vs-dark"
                    options={{
                      minimap: { enabled: false },
                      fontSize: 16,
                      readOnly: true,
                      automaticLayout: true,
                      scrollBeyondLastLine: false,
                    }}
                  />
                </div>

                {/* JS Editor */}
                <div>
                  <h3 className="text-lg px-6 font-medium text-gray-400 uppercase mt-1">JS</h3>
                  <Editor
                    height="200px"
                    language="javascript"
                    value={snippet.js}
                    theme="vs-dark"
                    options={{
                      minimap: { enabled: false },
                      fontSize: 16,
                      readOnly: true,
                      automaticLayout: true,
                      scrollBeyondLastLine: false,
                    }}
                  />
                </div>





                {/* Live Preview */}
                <div className=""><div className="flex space-x-4">
                  <h3 className="text-lg px-6 font-medium text-gray-400 uppercase mt-5">Preview</h3>

                  {user?.id === snippet.userId && (
                <div className="py-4">
                  {hostedUrl ? (
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 shadow-md bg-green-600 text-white hover:bg-green-700"
                    >
                      <Clipboard className="size-4" />
                      Copy URL
                    </button>
                  ) : (
                    <button
                      onClick={handleHosting}
                      disabled={isHosting}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 shadow-md ${
                        isHosting ? "bg-blue-500/20 text-blue-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      {isHosting ? (
                        <>
                          <div className="size-4 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
                          Hosting...
                        </>
                      ) : (
                        <>
                          <Rocket className="size-4" />
                          Host Preview
                        </>
                      )}
                    </button>
                  )}
                </div>
              )}


                </div>

                  <div className="mt-4 bg-white p-4 rounded-lg shadow-lg">
                    <iframe
                      className="w-full h-[300px] border-none"
                      srcDoc={`<!DOCTYPE html><html lang="en"><head><style>${snippet.css}</style></head><body>${snippet.html}<script>${snippet.js}</script></body></html>`}
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          <Comments snippetId={snippet._id} />
        </div>
      </main>



      {/* Share Modal */}
      {isShareModalOpen && (
        <Modal onClose={() => setIsShareModalOpen(false)}>
          <div className="flex flex-col items-start space-y-4">
            <h2 className="text-lg font-semibold">Share Preview</h2>
            <p className="text-gray-400">Select a platform to share your preview:</p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleSocialShare("linkedin")}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                LinkedIn
              </button>
              <button
                onClick={() => handleSocialShare("twitter")}
                className="bg-blue-400 text-white px-4 py-2 rounded-lg"
              >
                Twitter
              </button>
              <button
                onClick={() => handleSocialShare("facebook")}
                className="bg-blue-800 text-white px-4 py-2 rounded-lg"
              >
                Facebook
              </button>
              <button
                onClick={() => handleSocialShare("instagram")}
                className="bg-pink-500 text-white px-4 py-2 rounded-lg"
              >
                Instagram
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default SnippetDetailPage;
