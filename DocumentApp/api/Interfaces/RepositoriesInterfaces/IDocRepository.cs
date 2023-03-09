using System.Collections.Generic;
using System.Threading.Tasks;
using api.Entities;

namespace api.Interfaces
{
   public interface IDocsRepository
   {
      ///<summary>
      /// Gets document
      ///</summary>
      Task<DocDb> GetDocAsync(int id);

      ///<summary>
      /// Gets documents list
      ///</summary>
      Task<IEnumerable<DocDb>> GetDocsAsync();

      ///<summary>
      /// Updates document
      ///</summary>
      void Update(DocDb doc);

      ///<summary>
      /// Creates document
      ///</summary>
      void Create(DocDb doc);

      ///<summary>
      /// Deletes document
      ///</summary>
      void Delete(int id);

      ///<summary>
      /// Saves all changes to database
      ///</summary>
      Task<bool> SaveAllAsync();
   }
}