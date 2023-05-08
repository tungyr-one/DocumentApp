using System.Collections.Generic;
using System.Threading.Tasks;
using api.DTOs;

namespace api.Interfaces
{
   public interface IDocsService
    {
        ///<summary>
        /// Gets document
        ///</summary>
        Task<DocDto[]> GetDocsAsync(UserParams userParams);

        ///<summary>
        /// Gets documents list
        ///</summary>
        Task<DocDto> GetDocAsync(int id);

        ///<summary>
        /// Creates document
        ///</summary>
        Task<bool> CreateAsync(DocNewDto newDoc);

        ///<summary>
        /// Updates document
        ///</summary>
        Task<bool> UpdateAsync(int id, DocUpdateDto docUpdate);

        ///<summary>
        /// Deletes document
        ///</summary>
        Task<bool> DeleteAsync(int id);
    }
}