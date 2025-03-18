// Configuration for platform previews
export const platformPreviews = {
  'research-portal': `
    <div class="bg-indigo-600 text-white p-4 flex justify-between items-center">
      <div class="flex items-center">
        <svg width="24" height="24" viewBox="0 0 40 40" class="fill-current text-white mr-2">
          <path d="M20 0C8.954 0 0 8.954 0 20s8.954 20 20 20 20-8.954 20-20S31.046 0 20 0zm0 36c-8.837 0-16-7.163-16-16S11.163 4 20 4s16 7.163 16 16-7.163 16-16 16z"/>
          <path d="M20 8c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12S26.627 8 20 8zm-2 18l-4-4 1.4-1.4 2.6 2.6 6.6-6.6L26 18l-8 8z"/>
        </svg>
        <span class="font-bold">Research Portal</span>
      </div>
      <div class="flex space-x-3">
        <div class="w-3 h-3 bg-red-400 rounded-full"></div>
        <div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
        <div class="w-3 h-3 bg-green-400 rounded-full"></div>
      </div>
    </div>
    <div class="grid grid-cols-4 gap-2 p-4">
      <div class="col-span-1 bg-indigo-100 rounded-lg p-2">
        <div class="bg-indigo-200 rounded mb-2 h-4 w-3/4"></div>
        <div class="bg-indigo-200 rounded mb-2 h-4"></div>
        <div class="bg-indigo-200 rounded mb-2 h-4"></div>
        <div class="bg-indigo-200 rounded mb-2 h-4 w-1/2"></div>
        <div class="bg-indigo-200 rounded mb-2 h-4"></div>
      </div>
      <div class="col-span-3 bg-gray-100 rounded-lg p-3">
        <div class="bg-white rounded-lg p-2 mb-2 shadow-sm">
          <div class="flex justify-between items-center mb-2">
            <div class="bg-indigo-500 rounded h-5 w-1/4"></div>
            <div class="bg-green-500 rounded-full h-4 w-16"></div>
          </div>
          <div class="bg-gray-200 rounded h-3 w-full mb-2"></div>
          <div class="bg-gray-200 rounded h-3 w-5/6"></div>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div class="bg-white rounded-lg p-2 shadow-sm">
            <div class="bg-purple-500 rounded h-5 w-1/3 mb-2"></div>
            <div class="bg-gray-200 rounded h-3 w-full mb-2"></div>
            <div class="bg-gray-200 rounded h-3 w-2/3"></div>
          </div>
          <div class="bg-white rounded-lg p-2 shadow-sm">
            <div class="bg-blue-500 rounded h-5 w-1/3 mb-2"></div>
            <div class="bg-gray-200 rounded h-3 w-full mb-2"></div>
            <div class="bg-gray-200 rounded h-3 w-3/4"></div>
          </div>
        </div>
      </div>
    </div>
  `,
  
  'marketplace': `
    <div class="bg-green-600 text-white p-4 flex justify-between items-center">
      <div class="flex items-center">
        <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
        <span class="font-bold">Data Marketplace</span>
      </div>
      <div class="flex space-x-3">
        <div class="w-3 h-3 bg-red-400 rounded-full"></div>
        <div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
        <div class="w-3 h-3 bg-green-400 rounded-full"></div>
      </div>
    </div>
    <div class="p-4 grid grid-cols-3 gap-3">
      <div class="col-span-3 mb-2">
        <div class="bg-gray-200 rounded-lg flex items-center p-1">
          <svg class="w-4 h-4 text-gray-500 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <div class="bg-gray-300 mx-2 h-3 w-2/3 rounded"></div>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-sm p-3">
        <div class="bg-green-100 rounded mb-2 h-16 flex items-center justify-center">
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
        <div class="bg-gray-800 rounded h-4 w-2/3 mb-1"></div>
        <div class="bg-gray-300 rounded h-3 w-full mb-3"></div>
        <div class="flex justify-between items-center">
          <div class="bg-green-500 rounded-full h-5 w-16"></div>
          <div class="bg-gray-200 rounded-full h-5 w-8"></div>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-sm p-3">
        <div class="bg-blue-100 rounded mb-2 h-16 flex items-center justify-center">
          <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
        </div>
        <div class="bg-gray-800 rounded h-4 w-2/3 mb-1"></div>
        <div class="bg-gray-300 rounded h-3 w-full mb-3"></div>
        <div class="flex justify-between items-center">
          <div class="bg-blue-500 rounded-full h-5 w-16"></div>
          <div class="bg-gray-200 rounded-full h-5 w-8"></div>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-sm p-3">
        <div class="bg-purple-100 rounded mb-2 h-16 flex items-center justify-center">
          <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
          </svg>
        </div>
        <div class="bg-gray-800 rounded h-4 w-2/3 mb-1"></div>
        <div class="bg-gray-300 rounded h-3 w-full mb-3"></div>
        <div class="flex justify-between items-center">
          <div class="bg-purple-500 rounded-full h-5 w-16"></div>
          <div class="bg-gray-200 rounded-full h-5 w-8"></div>
        </div>
      </div>
    </div>
  `,
  
  'ml-environment': `
    <div class="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div class="flex items-center">
        <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
        <span class="font-bold">ML Environment</span>
      </div>
      <div class="flex space-x-3">
        <div class="w-3 h-3 bg-red-400 rounded-full"></div>
        <div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
        <div class="w-3 h-3 bg-green-400 rounded-full"></div>
      </div>
    </div>
    <div class="grid grid-cols-5 h-full">
      <div class="col-span-1 bg-gray-800 p-2">
        <div class="bg-gray-700 rounded mb-1 h-4 w-2/3"></div>
        <div class="bg-gray-700 rounded mb-1 h-4 w-1/2"></div>
        <div class="bg-blue-500 rounded mb-1 h-4 w-3/4"></div>
        <div class="bg-gray-700 rounded mb-1 h-4 w-2/3"></div>
        <div class="bg-gray-700 rounded mb-1 h-4 w-1/2"></div>
      </div>
      <div class="col-span-4 bg-gray-100 p-2">
        <div class="bg-white rounded-lg shadow-sm p-2 mb-2">
          <div class="bg-gray-200 rounded h-4 w-1/4 mb-2"></div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <div class="bg-gray-200 rounded h-3 w-full mb-1"></div>
              <div class="bg-gray-200 rounded h-3 w-5/6 mb-1"></div>
              <div class="bg-gray-200 rounded h-3 w-4/6 mb-1"></div>
            </div>
            <div class="bg-blue-100 rounded flex items-center justify-center">
              <svg class="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-sm p-2">
          <div class="flex justify-between mb-2">
            <div class="bg-gray-200 rounded h-4 w-1/4"></div>
            <div class="flex space-x-1">
              <div class="bg-green-500 rounded-full h-4 w-4"></div>
              <div class="bg-blue-500 rounded-full h-4 w-4"></div>
              <div class="bg-purple-500 rounded-full h-4 w-4"></div>
            </div>
          </div>
          <div class="bg-gray-800 rounded-lg h-20 w-full flex items-center p-2">
            <span class="text-green-400 text-xs">&gt; _</span>
          </div>
        </div>
      </div>
    </div>
  `
};

// Other configuration options can be added here
export const config = {
  // Icon definitions
  icons: {
    accessibleScience: `<svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
    </svg>`,
    // Add other icon definitions as needed
  }
};